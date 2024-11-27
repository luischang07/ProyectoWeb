<template>
    <section class="container text-center mt-3">
        <div class="row justify-content-between align-items-center p-2">
            <div class="col-md-6">
                <h3>Personal</h3>
                <p>Listado del personal registrado.</p>
            </div>
            <div class="col-md-3 text-right">
                <router-link :to="{ path: '/personal/agregar' }">
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="fa fa-plus"></i> Agregar
                    </button>
                </router-link>
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
        <table class="table table-striped">
            <thead>
                <tr>
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
                    <td>{{ persona.nombre }}</td>
                    <td>{{ persona.direccion }}</td>
                    <td>{{ persona.telefono }}</td>
                    <td>{{ persona.estatus }}</td>
                    <td class="centrado">
                        <fieldset class="btn-group" aria-label="Basic outline example">
                            <button type="button" class="btn btn-sm btn-outline-primary">
                                <RouterLink class="nav-link item" :to="{path: '/personal/'+persona.id+'/editar'}">
                                    <i class="fa fa-edit"></i>
                                </RouterLink>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger">
                                <RouterLink class="nav-link item" :to="{path: '/personal/'+persona.id+'/borrar'}">
                                    <i class="fa fa-trash"></i>
                                </RouterLink>
                            </button>
                        </fieldset>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
    <Pagination 
        :currentPage="page" 
        :totalPages="totalPages" 
        @update:currentPage="handlePageChange" 
    />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { usePersonal } from '../controladores/UsePersonal';
import { errorToast } from '@/modulos/utils/displayToast';
import Pagination from '@/modulos/utils/components/Pagination.vue';

const { getPersonal, personal, mensaje } = usePersonal();
const filterValue = ref('');
const filterField = ref('nombre');
const page = ref(1);
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
};

onMounted(fetchPersonal);
watch([filterValue, filterField, page], fetchPersonal);
</script>

<style scoped>
.card-hover {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #0d6efd;
}
</style>
