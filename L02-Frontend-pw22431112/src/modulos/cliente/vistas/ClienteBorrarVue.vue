<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCliente } from '../controladores/useCliente';
import 'vue3-toastify/dist/index.css';

const { getClienteById, deleteCliente, mensaje, clientes } = useCliente();

let idCliente = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
    () => mensaje.value,
    newId => {
        routeRedirect.push('/clientes');
    }
);

onMounted(async () => {
    idCliente = Number(route.params.id);
    await getClienteById(Number(idCliente));
});
</script>

<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="clientes[0]">
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <div class="card-header border-custom">
                <h4 class="text-center">Borrar Cliente</h4> 
            </div>
            <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Cliente eliminado con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== ''" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <!-- ID -->
                <div class="mb-3">
                    <label for="id">ID</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-hash"></i></span>
                        <input type="text" class="form-control" v-model="clientes[0].id" placeholder="Id" disabled>
                    </div>
                </div>
                <!-- Nombre -->
                <div class="mb-3">
                    <label for="nombre">Nombre</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <input type="text" class="form-control" v-model="clientes[0].nombre" placeholder="Nombre" disabled>
                    </div>
                </div>
                <!-- Direccion -->
                <div class="mb-3">
                    <label for="direccion">Dirección</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-house-door"></i></span>
                        <input type="text" class="form-control" v-model="clientes[0].direccion" placeholder="Dirección" disabled>
                    </div>
                </div>
                <!-- Telefono -->
                <div class="mb-3">
                    <label for="telefono">Teléfono</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-telephone"></i></span>
                        <input type="text" class="form-control" v-model="clientes[0].telefono" placeholder="Teléfono" disabled>
                    </div>
                </div>
                <!-- Correo Electrónico -->
                <div class="mb-3">
                    <label for="correo">Correo Electrónico</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                        <input type="email" class="form-control" v-model="clientes[0].correo_electronico" placeholder="Correo Electrónico" disabled>
                    </div>
                </div>
                <!-- Ciudad -->
                <div class="mb-3">
                    <label for="ciudad">Ciudad</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
                        <input type="text" class="form-control" v-model="clientes[0].ciudad" placeholder="Ciudad" disabled>
                    </div>
                </div>
                <!-- boton -->
                <div class="mb-3 text-center">
                    <button class="btn btn-danger" @click="deleteCliente(clientes[0])">Borrar</button>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
.border-custom {
    border: 3px solid #ff0000; /* Red border */
    border-radius: 20px;
    background-color: #ffcdd2; /* Light red background */
}

.small-card {
    max-width: 600px; 
    width: 100%;
}

.card {
    margin: 0 auto;
    padding: 2rem;
}
</style>
