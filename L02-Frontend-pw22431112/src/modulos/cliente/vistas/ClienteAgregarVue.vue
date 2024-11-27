<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { ClienteAgregar } from '../interfaces/cliente-interface';
import { useCliente } from '../controladores/useCliente';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';

const { setCliente, mensaje } = useCliente();

let cliente = ref<ClienteAgregar>({
    nombre: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    ciudad: ''
});

const showErrorToast = () => {
    if (mensaje.value && mensaje.value[0] !== 'Cliente agregado con éxito') {
        errorToast('No se puede ingresar este cliente');
    }
};

const showSuccessToast = () => {
    if (mensaje.value && mensaje.value[0] === 'Cliente agregado con éxito') {
        sucessToast('Cliente agregado correctamente');
    }
};

watch(mensaje, () => {
    showErrorToast();
    showSuccessToast();
});

watch(mensaje, () => {
    if (mensaje.value && mensaje.value[0] === 'Cliente agregado con éxito') {
        // cliente.value = {
        //     nombre: '',
        //     direccion: '',
        //     telefono: '',
        //     correo_electronico: '',
        //     ciudad: ''
        // };
    }
});
</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4 class="text-center">Agregar cliente</h4> 
            </div>
            <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Cliente agregado con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Cliente agregado con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="cliente.nombre" placeholder="Nombre">
                </div>
                <div class="mb-3">
                    Dirección
                    <input type="text" class="form-control" v-model="cliente.direccion" placeholder="Dirección">
                </div>
                <div class="mb-3">
                    Teléfono
                    <input type="text" class="form-control" v-model="cliente.telefono" placeholder="Teléfono">
                </div>
                <div class="mb-3">
                    Correo Electrónico
                    <input type="email" class="form-control" v-model="cliente.correo_electronico" placeholder="Correo Electrónico">
                </div>
                <div class="mb-3">
                    Ciudad
                    <input type="text" class="form-control" v-model="cliente.ciudad" placeholder="Ciudad">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="setCliente(cliente)">Agregar</button>
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
