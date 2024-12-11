<template>
    <section class="container text-center mt-3">
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <h3 class="titulo">Ventas</h3>
                <p>Listado de ventas registradas.</p>
            </div>
            <div class="col-md-3 text-right">
                <RouterLink :to="{ path: '/ventas/agregar' }">
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
                    <option value="id_articulo">ID Artículo</option>
                    <option value="id_cliente">ID Cliente</option>
                    <option value="cantidad">Cantidad</option>
                    <option value="precio">Precio</option>
                    <option value="IVA">IVA</option>
                    <option value="subtotal">Subtotal</option>
                    <option value="total">Total</option>
                    <option value="fecha_venta">Fecha Venta</option>
                </select>
            </div>
        </div>
    </section>
    <section class="container text-center mt-3">
        <table class="table table-bordered">
            <thead>
                <tr class="table-info">
                    <th>ID</th>
                    <th>ID Artículo</th>
                    <th>ID Cliente</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>IVA</th>
                    <th>Subtotal</th>
                    <th>Total</th>
                    <th>Fecha Venta</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="ventas.length == 0">
                    <td class="centrado" colspan="10">Sin Ventas Registradas</td>
                </tr>
                <tr v-else v-for="(venta, index) in ventas" :key="index">
                    <td>{{ venta.id }}</td>
                    <td>{{ venta.id_articulo }}</td>
                    <td>{{ venta.id_cliente }}</td>
                    <td>{{ venta.cantidad }}</td>
                    <td>{{ venta.precio }}</td>
                    <td>{{ venta.IVA }}</td>
                    <td>{{ venta.subtotal }}</td>
                    <td>{{ venta.total }}</td>
                    <td>{{ venta.fecha_venta }}</td>
                    <td class="centrado">
                        <fieldset class="btn-group" aria-label="Basic outline example">
                            <RouterLink title="Editar" class="btn btn-sm btn-outline-primary p-2 m-1"
                                :to="{ path: '/ventas/' + venta.id + '/editar' }">
                                <i class="fa fa-edit"></i>
                            </RouterLink>
                            <RouterLink title="Eliminar" class="btn btn-sm btn-outline-danger p-2 m-1"
                                :to="{ path: '/ventas/' + venta.id + '/borrar' }">
                                <i class="fa fa-trash"></i>
                            </RouterLink>
                        </fieldset>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
    <Pagination :currentPage="page" :totalPages="totalPages" @update:currentPage="handlePageChange" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useVentas } from '../controladores/useVentas';
import { errorToast, warningToast } from '@/modulos/utils/displayToast';
import Pagination from '@/modulos/utils/components/Pagination.vue';

const { getVentas, ventas, mensaje } = useVentas();
const filterValue = ref('');
const filterField = ref('id_articulo');
const page = ref(Number(localStorage.getItem('currentPageVentas')) || 1);
const limit = 12;
const totalPages = ref(1);

const fetchVentas = async () => {
    const params = {
        page: page.value,
        limit,
        filterField: filterField.value || '',
        ...(filterValue.value ? { filterValue: filterValue.value } : {}),
    };
    const response = await getVentas(params);

    if (response && response.pagination) {
        totalPages.value = response.pagination.totalPages;
    }

    if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
        errorToast(mensaje.value[0]);
    }

    if (ventas.value.length === 0) {
        warningToast('No hay registros disponibles');
    }
}

const handlePageChange = (newPage: number) => {
    page.value = newPage;
    localStorage.setItem('currentPageVentas', newPage.toString());
};

const downloadExcel = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/ventas/getVentas');
        const data = response.data;

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ventas.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error descargando el archivo Excel', error);
    }
};

onMounted(fetchVentas);
watch([filterValue, filterField, page], fetchVentas);
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
</style>
