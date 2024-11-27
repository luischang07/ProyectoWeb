<script lang="ts" setup>
import { onMounted, ref , watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCliente } from '../controladores/useCliente';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
const {getClienteById , mensaje, clientes, updateCliente} = useCliente();

let idCliente = 0;
const route = useRoute();

onMounted(async () => {
    idCliente = Number(route.params.id);
    await getClienteById(Number(idCliente));
});

const showErrorToast = () => {
    if (mensaje.value && mensaje.value[0] !== 'Cliente actualizado con éxito') {
        errorToast('No se puede actualizar este cliente');
    }
};

const showSuccessToast = () => {
    if (mensaje.value && mensaje.value[0] === 'Cliente actualizado con éxito') {
        sucessToast('Cliente actualizado con éxito');
    }
};

watch(mensaje, () => {
    showErrorToast();
    showSuccessToast();
});

const router = useRouter();

const disableButton = ref(false);
const tiempo = ref(3);

watch(mensaje, () => {
    timerRedirect();
});

const timerRedirect = () => {
    if (mensaje.value && mensaje.value[0] === 'Cliente actualizado con éxito') {
        disableButton.value = true;
        const interval = setInterval(() => {
            if (tiempo.value > 0) {
                tiempo.value -= 1;
            } else {
                clearInterval(interval);
                router.push('/clientes');
            }
        }, 1000);
    }
};

</script>

<template>
    <div class="container mt-5" v-if="clientes[0]">
        <div class="card">
            <div class="card-header">
                <h4 class="text-center">Editar Cliente</h4> 
            </div>
            <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Cliente actualizado con éxito'" role="alert">
            {{  mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Cliente actualizado con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id:
                    <input type="text" class="form-control" v-model="clientes[0].id" placeholder="Nombre" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="clientes[0].nombre" placeholder="Nombre">
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="clientes[0].direccion" placeholder="Direccion">
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="clientes[0].telefono" placeholder="Telefono">
                </div>
                <div class="mb-3">
                    Correo
                    <input type="text" class="form-control" v-model="clientes[0].correo_electronico" placeholder="Correo">
                </div>
                <div class="mb-3">
                    Ciudad
                    <input type="text" class="form-control" v-model="clientes[0].ciudad" placeholder="Ciudad">
                </div>
                <div class="mb-3">
                    <button class="btn btn-warning" @click="updateCliente(clientes[0])" :disabled="disableButton">Actualizar</button>
                    <p v-if="disableButton">Redirigiendo en {{ tiempo }}...</p>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
    
</style>
