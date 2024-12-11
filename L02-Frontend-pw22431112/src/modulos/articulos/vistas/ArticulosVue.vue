<template>
    <section class="container text-center mt-3">
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <h3 class="titulo">Artículos</h3>
                <p>Listado de los artículos registrados.</p>
            </div>
            <div class="col-md-3 text-right">
                <RouterLink :to="{ path: '/articulos/agregar' }">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i> Agregar
                    </button>
                </RouterLink>
                <button @click="downloadExcel" class="btn btn-sm btn-outline-success ml-2">
                    <i class="fa fa-download"></i> Descargar Excel
                </button>
            </div>
        </div>
        <!-- Resto del código -->
    </section>
    <section class="container text-center mt-3">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr class="table-info">
                        <th>ID</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Cantidad en almacen</th>
                        <th>Fecha de Caducidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="articulos.length == 0">
                        <td class="centrado" colspan="6">Sin Artículos Registrados</td>
                    </tr>
                    <tr v-else v-for="(articulo, index) in articulos" :key="index">
                        <td>{{ articulo.id }}</td>
                        <td>{{ articulo.descripcion }}</td>
                        <td>${{ articulo.precio }}</td>
                        <td> {{ articulo.cantidad_en_almacen }}</td>
                        <td>{{ articulo.fecha_caducidad === '1969-12-31' ? 'Sin fecha de caducidad' :
                            articulo.fecha_caducidad }}</td>
                        <td class="centrado">
                            <fieldset class="btn-group" aria-label="Basic outline example">
                                <RouterLink class="item btn btn-sm btn-outline-primary p-2 m-1"
                                    :to="{ path: '/articulos/' + articulo.id + '/editar' }">
                                    <i class="fa fa-edit"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-outline-danger p-2 m-1"
                                    :to="{ path: '/articulos/' + articulo.id + '/borrar' }">
                                    <i class="fa fa-trash"></i>
                                </RouterLink>
                            </fieldset>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <Pagination :currentPage="page" :totalPages="totalPages" @update:currentPage="handlePageChange" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useArticulos } from '../controladores/useArticulos';
import { errorToast } from '@/modulos/utils/displayToast';
import Pagination from '@/modulos/utils/components/Pagination.vue';

const { getArticulos, articulos, mensaje } = useArticulos();
const filterValue = ref('');
const filterField = ref('descripcion');
const page = ref(Number(localStorage.getItem('currentPageArticulos')) || 1);
const limit = 12;
const totalPages = ref(1); // Total de páginas, actualiza este valor deswpués de obtener datos

const fetchArticulos = async () => {
    const params = {
        page: page.value,
        limit,
        filterField: filterField.value || '',
        ...(filterValue.value ? { filterValue: filterValue.value } : {}),
    };
    const response = await getArticulos(params);

    if (response && response.pagination) {
        totalPages.value = response.pagination.totalPages;
    }

    if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
        errorToast(mensaje.value[0]);
    }
};

const handlePageChange = (newPage: number) => {
    page.value = newPage;
    localStorage.setItem('currentPageArticulos', newPage.toString());
};

const downloadExcel = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/articulos/getArticulos');
        const data = response.data;

        // Convertir los datos a una hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Artículos');

        // Crear un archivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // Descargar el archivo Excel
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'articulos.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error descargando el archivo Excel', error);
    }
};

onMounted(fetchArticulos);
watch([filterValue, filterField, page], fetchArticulos);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

.table-hover tr:hover {
    background-color: #f5f5f5;
}

.titulo {
    font-size: 2.3em;
    font-weight: 400;
    font-family: "Archivo Black", sans-serif;
    font-style: normal;
}

th {
    background-color: #ae667c;
}

.table-responsive {
    overflow-x: auto;
}
</style>
