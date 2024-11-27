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
                <input type="text" class="form-control" v-model="searchQuery" placeholder="Buscar...">
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <label for="searchField" class="form-label me-2 mb-0">Filtro:</label>
                <select v-model="searchField" class="form-select">
                <option value="nombre">Nombre</option>
                <option value="direccion">Dirección</option>
                <option value="telefono">Teléfono</option>
                <option value="estatus">Estatus</option>
                </select>
            </div>
        </div>
    </section>

    <section class="container mt-3">
        <div v-if="pagedPersonal.length > 0" class="row">
            <div v-for="(persona, index) in pagedPersonal" :key="index" class="col-md-3 mb-4">
                <div class="card h-100 card-hover">
                    <div class="card-body">
                        <h5 class="card-title">Clave: {{ persona.id }}</h5>
                        <p class="card-text"><strong>Nombre:</strong> {{ persona.nombre }}</p>
                        <p class="card-text"><strong>Dirección:</strong> {{ persona.direccion }}</p>
                        <p class="card-text"><strong>Teléfono:</strong> {{ persona.telefono }}</p>
                        <p class="card-text"><strong>Estatus:</strong> {{ persona.estatus }}</p>
                        <div class="d-flex justify-content-between" role="group" aria-label="Basic outlined example">
                        <router-link :to="{ path: '/personal/' + persona.id + '/editar' }" class="btn btn-sm btn-outline-primary btn-fade mx-2">
                            Editar
                            <i class="fa fa-pencil"></i>
                        </router-link>
                        <router-link :to="{ path: '/personal/' + persona.id + '/borrar' }" class="btn btn-sm btn-outline-danger btn-fade">
                            Borrar
                            <i class="fa fa-trash"></i>
                        </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Paginación -->
            <pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @update:currentPage="goToPage"
            />
        </div>
        <div v-else class="alert alert-warning text-center" role="alert">
        No hay registros
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { usePersonal } from '../controladores/usePersonal';
import { errorToast, warningToast } from '@/modulos/utils/displayToast';
import pagination from '@/modulos/utils/components/Pagination.vue';

const { getPersonal, personal, mensaje } = usePersonal();
const searchQuery = ref('');
const searchField = ref('nombre');
const currentPage = ref(1);
const itemsPerPage = 12;

onMounted(async () => {
await getPersonal();
if (mensaje.value[0] === 'No fue posible conectarse con el servidor') {
    errorToast(mensaje.value[0]);
} else {
    personal.value.length === 0 || personal.value.length === undefined
    ? warningToast('No hay registros disponibles'): null;
}
});

watch(personal, (newVal) => {
if (newVal.length === 0) {
    warningToast('No hay registros disponibles');
}
});

const filteredPersonal = computed(() => {
const query = searchQuery.value.toLowerCase();
return personal.value.filter((persona) => {
    return (persona as { [key: string]: string | number })[searchField.value]
    ?.toString()
    .toLowerCase()
    .includes(query);
});
});

const totalPages = computed(() => {
return Math.ceil(filteredPersonal.value.length / itemsPerPage);
});

const pagedPersonal = computed(() => {
const startIndex = (currentPage.value - 1) * itemsPerPage;
return filteredPersonal.value.slice(startIndex, startIndex + itemsPerPage);
});

const goToPage = (page: number) => {
if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
}
};
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
