<template>
    <section class="container text-center mt-3">
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <h3 class="titulo">Compras</h3>
                <p>Listado de compras registradas.</p>
            </div>
            <div class="col-md-3 text-right">
                <router-link :to="{ path: '/compras/agregar' }">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i> Agregar
                    </button>
                </router-link>
                <button @click="downloadExcel" class="btn btn-sm btn-outline-success ml-2">
                    <i class="fa fa-download"></i> Descargar Excel
                </button>
            </div>
        </div>

        <!-- Filtro de búsqueda -->
        <div class="row mt-3">
            <div class="col-md-8">
                <input type="text" class="form-control" v-model="searchQuery" placeholder="Buscar...">
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <label for="searchField" class="form-label me-2 mb-0">Filtro:</label>
                <select v-model="searchField" class="form-select">
                    <option value="id">ID</option>
                    <option value="id_articulo">ID Articulo</option>
                    <option value="cantidad">Cantidad</option>
                    <option value="precio">Precio</option>
                    <option value="IVA">IVA</option>
                    <option value="subtotal">Subtotal</option>
                    <option value="total">Total</option>
                    <option value="fecha_compra">Fecha de compra</option>
                </select>
            </div>
        </div>

        <!-- Tabla de compras -->
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-info">
                                <th>ID</th>
                                <th>ID Articulo</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>IVA</th>
                                <th>Subtotal</th>
                                <th>Total</th>
                                <th>Fecha de compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="compras.length == 0">
                                <td class="centrado" colspan="8">Sin Compras Registradas</td>
                            </tr>
                            <tr v-for="compra in pagedCompras" :key="compra.id">
                                <td>{{ compra.id }}</td>
                                <td>{{ compra.id_articulo }}</td>
                                <td>{{ compra.cantidad }}</td>
                                <td>${{ compra.precio }}</td>
                                <td>${{ compra.IVA }}</td>
                                <td>${{ compra.subtotal }}</td>
                                <td>${{ compra.total }}</td>
                                <td>{{ compra.fecha_compra }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Paginación -->
        <pagination :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="goToPage" />
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useCompras } from '../controladores/useCompras';
import { errorToast, warningToast } from '@/modulos/utils/displayToast';
import pagination from '@/modulos/utils/components/Pagination.vue';
import { RouterLink } from 'vue-router';

const { getCompras, compras, mensaje } = useCompras();
const searchQuery = ref('');
const searchField = ref('id');
const currentPage = ref(Number(localStorage.getItem('currentPageCompras')) || 1);
const itemsPerPage = 10;

onMounted(async () => {
    await getCompras();
    console.log(compras.value);
    if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
        errorToast(mensaje.value[0]);
    }
});

watch(compras, (newVal) => {
    if (newVal.length === 0) {
        warningToast('No hay registros disponibles');
    }
});

const filteredCompras = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return compras.value.filter((compra) => {
        return (compra as { [key: string]: string | number })[searchField.value]
            ?.toString()
            .toLowerCase()
            .includes(query);
    });
});

const totalPages = computed(() => {
    return Math.ceil(filteredCompras.value.length / itemsPerPage);
});

const pagedCompras = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return filteredCompras.value.slice(startIndex, startIndex + itemsPerPage);
});

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        localStorage.setItem('currentPageCompras', page.toString());
    }
};

const downloadExcel = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/compras/getCompras');
        const data = response.data;

        // Convertir los datos a una hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Compras');

        // Crear un archivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // Descargar el archivo Excel
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'compras.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error descargando el archivo Excel', error);
    }
};
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
