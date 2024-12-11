<template>
    <section class="container text-center mt-3">
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <h3 class="titulo">Registros</h3>
                <p>Listado de los registros entrada/salida del personal.</p>
            </div>
            <div class="col-md-3 text-right">
                <RouterLink :to="{ path: '/registro/agregar' }">
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
                    <option value="id">ID</option>
                    <option value="id_personal">ID Personal</option>
                    <option value="fecha">Fecha</option>
                    <option value="hora">Hora</option>
                    <option value="movimiento">Movimiento</option>
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
                        <th>ID Personal</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Movimiento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedRegistros.length === 0">
                        <td class="centrado" colspan="6">Sin registros</td>
                    </tr>
                    <tr v-else v-for="(registro, index) in paginatedRegistros" :key="index">
                        <td>{{ registro.id }}</td>
                        <td>{{ registro.id_personal }}</td>
                        <td>{{ registro.fecha ? formatDate(String(registro.fecha)) : 'N/A' }}</td>
                        <td>{{ registro.hora }}</td>
                        <td>{{ registro.movimiento }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination :totalPages="totalPages" :currentPage="page" @update:currentPage="handlePageChange" />
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useRegistros } from '../controladores/useRegistros';
import { errorToast, warningToast } from '@/modulos/utils/displayToast';
import Pagination from '@/modulos/utils/components/Pagination.vue';

const { getRegistros, mensaje, registros } = useRegistros();
const filterValue = ref('');
const filterField = ref<'id' | 'id_personal' | 'fecha' | 'hora' | 'movimiento'>('id');
const page = ref(Number(localStorage.getItem('currentPageRegistros')) || 1);
const limit = 12;
const totalPages = ref(1);
const paginatedRegistros = ref<{ id: number; id_personal: number; fecha: string | Date | null; hora: string | Date | null; movimiento: "entrada" | "salida"; }[]>([]);

// Computed property para obtener los registros filtrados
const filteredRegistros = computed(() => {
    return registros.value.filter((registro) => {
        const value = String(registro[filterField.value as keyof typeof registro]).toLowerCase();
        return value.includes(filterValue.value.toLowerCase());
    });
});

// Función para obtener los registros y aplicar la paginación
const fetchRegistros = async () => {
    await getRegistros();

    if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
        errorToast(mensaje.value[0]);
        return;
    }

    if (filteredRegistros.value.length === 0) {
        warningToast('No hay registros disponibles');
    }

    totalPages.value = Math.ceil(filteredRegistros.value.length / limit); // Actualizar el total de páginas
    updatePaginatedRegistros(); // Actualizar los registros mostrados en la página actual
};

// Función para actualizar los registros paginados
const updatePaginatedRegistros = () => {
    const startIndex = (page.value - 1) * limit;
    const endIndex = startIndex + limit;
    paginatedRegistros.value = filteredRegistros.value.slice(startIndex, endIndex);
};

// Función para manejar el cambio de página
const handlePageChange = (newPage: number) => {
    page.value = newPage;
    localStorage.setItem('currentPageRegistros', newPage.toString());
    updatePaginatedRegistros(); // Actualizar los registros mostrados cuando cambia la página
};

// Función para descargar el Excel
const downloadExcel = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/registros');
        const data = response.data;

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Personal');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'registros.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error descargando el archivo Excel', error);
    }
};

// Función para formatear las fechas
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

onMounted(fetchRegistros);
watch([filterValue, filterField], () => {
    page.value = 1; // Resetear a la primera página al cambiar los filtros
    fetchRegistros();
});
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
