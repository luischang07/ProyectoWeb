<template>
    <section class="container text-center mt-3">
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <h3 class="titulo">Personal</h3>
                <p>Listado del personal registrado.</p>
            </div>
            <div class="col-md-3 text-right">
                <RouterLink :to="{ path: '/personal/agregar' }">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i> Agregar
                    </button>
                </RouterLink>
                <button @click="downloadExcel" class="btn btn-sm btn-outline-success ml-2">
                    <i class="fa fa-download"></i> Descargar Excel
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-8">
                <input type="text" class="form-control" v-model="filterValue" placeholder="Buscar...">
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <label for="filterField" class="form-label me-2 mb-0">Filtro:</label>
                <select v-model="filterField" class="form-select">
                    <option value="nombre">Nombre</option>
                    <option value="direccion">Dirección</option>
                    <option value="telefono">Teléfono</option>
                    <option value="estatus">Estatus</option>
                </select>
            </div>
        </div>
    </section>
    <section class="container text-center mt-3">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr class="table-info">
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="personal.length == 0">
                        <td class="centrado" colspan="6">Sin Personal Registrado</td>
                    </tr>
                    <tr v-else v-for="(persona, index) in personal" :key="index">
                        <td>{{ persona.id }}</td>
                        <td>{{ persona.nombre }}</td>
                        <td>{{ persona.direccion }}</td>
                        <td>{{ persona.telefono }}</td>
                        <td>{{ persona.estatus }}</td>
                        <td class="centrado">
                            <fieldset class="btn-group" aria-label="Basic outline example">
                                <RouterLink title="Editar" class="btn btn-sm btn-outline-primary p-2 m-1"
                                    :to="{ path: '/personal/' + persona.id + '/editar' }">
                                    <i class="fa fa-edit"></i>
                                </RouterLink>
                                <RouterLink title="Eliminar" class="btn btn-sm btn-outline-danger p-2 m-1"
                                    :to="{ path: '/personal/' + persona.id + '/borrar' }">
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
import { usePersonal } from '../controladores/usePersonal';
import { errorToast } from '@/modulos/utils/displayToast';
import Pagination from '@/modulos/utils/components/Pagination.vue';

const { getPersonal, personal, mensaje } = usePersonal();
const filterValue = ref('');
const filterField = ref('nombre');
const page = ref(Number(localStorage.getItem('currentPagePersonal')) || 1);
const limit = 12;
const totalPages = ref(1); // Total de páginas, actualiza este valor después de obtener datos

const fetchPersonal = async () => {
    const params = {
        page: page.value,
        limit,
        filterField: filterField.value || '',
        ...(filterValue.value ? { filterValue: filterValue.value } : {}),
    };
    const response = await getPersonal(params);

    if (response && response.pagination) {
        totalPages.value = response.pagination.totalPages;
    }

    if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
        errorToast(mensaje.value[0]);
    }
};

const handlePageChange = (newPage: number) => {
    page.value = newPage;
    localStorage.setItem('currentPagePersonal', newPage.toString());
};

const downloadExcel = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/personal/getPersonal');
        const data = response.data;

        // Convertir los datos a una hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Personal');

        // Crear un archivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // Descargar el archivo Excel
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'personal.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error descargando el archivo Excel', error);
    }
};

onMounted(fetchPersonal);
watch([filterValue, filterField, page], fetchPersonal);
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
