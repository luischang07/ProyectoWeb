<template>
    <section class="container text-center mt-3">
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <h3>Clientes</h3>
                <p>Listado de clientes registrados.</p>
            </div>
            <div class="col-md-3 text-right">
                <router-link :to="{ path: '/clientes/agregar' }">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i> Agregar
                    </button>
                </router-link>
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
                    <option value="nombre">Nombre</option>
                    <option value="direccion">Dirección</option>
                    <option value="telefono">Teléfono</option>
                    <option value="correo_electronico">Correo</option>
                    <option value="ciudad">Ciudad</option>
                </select>
            </div>
        </div>

        <!-- Tabla de clientes -->
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-info">
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Ciudad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="clientes.length == 0">
                                <td class="centrado" colspan="7">Sin Clientes Registrados</td>
                            </tr>
                            <tr v-for="cliente in pagedClientes" :key="cliente.id">
                                <td>{{ cliente.id }}</td>
                                <td>{{ cliente.nombre }}</td>
                                <td>{{ cliente.direccion }}</td>
                                <td>{{ cliente.telefono }}</td>
                                <td>{{ cliente.correo_electronico }}</td>
                                <td>{{ cliente.ciudad }}</td>
                                <td>
                                    <RouterLink title="Editar" :to="{ path: '/clientes/'+ cliente.id +'/editar/' } " class="btn btn-sm btn-outline-primary p-2 m-1">
                                        <i class="fa fa-edit"></i>
                                    </RouterLink>
                                    <RouterLink title="Eliminar" :to="{ path: '/clientes/' + cliente.id + '/borrar' }" class="btn btn-sm btn-outline-danger p-2 m-1">
                                        <i class="fa fa-trash"></i>
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Paginación -->
        <pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @update:currentPage="goToPage"
        />
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useCliente } from '../controladores/useCliente';
import { errorToast, warningToast } from '@/modulos/utils/displayToast';
import pagination from '@/modulos/utils/components/Pagination.vue';
import { RouterLink } from 'vue-router';

const { getClientes, clientes, mensaje } = useCliente();
const searchQuery = ref('');
const searchField = ref('nombre');
const currentPage = ref(Number(localStorage.getItem('currentPageCliente')) || 1); // Se guarda la página actual en localStorage
const itemsPerPage = 10;

onMounted(async () => {
    await getClientes();
    if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
        errorToast(mensaje.value[0]);
    }
});

watch(clientes, (newVal) => {
    if (newVal.length === 0) {
        warningToast('No hay registros disponibles');
    }
});

const filteredClientes = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return clientes.value.filter((cliente) => {
        return (cliente as { [key: string]: string | number })[searchField.value]
        ?.toString()
        .toLowerCase()
        .includes(query);
    });
});

const totalPages = computed(() => {
    return Math.ceil(filteredClientes.value.length / itemsPerPage);
});

const pagedClientes = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return filteredClientes.value.slice(startIndex, startIndex + itemsPerPage);
});

// Función para manejar el cambio de página
const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        localStorage.setItem('currentPageCliente', page.toString()); // Guardar la página actual en localStorage
    }
};
</script>

<style scoped>
.table-hover tr:hover {
    background-color: #f5f5f5;
}
</style>
