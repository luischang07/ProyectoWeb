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
    <div class="container mt-5" v-if="clientes[0]">
        <div class="card">
            <div class="card-header">
                <h4 class="text-center">Borrar cliente</h4> 
            </div>
            <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Cliente eliminado con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== ''" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id:
                    <input type="text" class="form-control" v-model="clientes[0].id" placeholder="Id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="clientes[0].nombre" placeholder="Nombre" disabled>
                </div>
                <div class="mb-3">
                    Dirección
                    <input type="text" class="form-control" v-model="clientes[0].direccion" placeholder="Dirección" disabled>
                </div>
                <div class="mb-3">
                    Teléfono
                    <input type="text" class="form-control" v-model="clientes[0].telefono" placeholder="Teléfono" disabled>
                </div>
                <div class="mb-3">
                    Correo Electrónico
                    <input type="email" class="form-control" v-model="clientes[0].correo_electronico" placeholder="Correo Electrónico" disabled>
                </div>
                <div class="mb-3">
                    Ciudad
                    <input type="text" class="form-control" v-model="clientes[0].ciudad" placeholder="Ciudad" disabled>
                </div>
                <div class="mb-3">
                    <button class="btn btn-danger" @click="deleteCliente(clientes[0])">Borrar</button>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
.table-hover tr:hover {
    background-color: #f5f5f5;
}
</style>
