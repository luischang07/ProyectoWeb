<script lang="ts" setup>
import { ref , watch } from 'vue';
import type { PersonalAgregar } from '../interfaces/personal-interface';
import { usePersonal } from '../controladores/usePersonal';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
const {setPersonal, mensaje} = usePersonal();

    let personal = ref<PersonalAgregar>({
        nombre: '',
        direccion: '',
        telefono: '',
        estatus: '0'
        });
    
    const showErrorToast = () => {
        if (mensaje.value && mensaje.value[0] !== 'Personal agregado con éxito') {
            errorToast('No se puede ingresar este personal')
        }
    };

    const showSuccessToast = () => {
        if (mensaje.value && mensaje.value[0] === 'Personal agregado con éxito') {
            sucessToast('Personal agregado correctamente')
        }
    };

    watch(mensaje, () => {
        showErrorToast();
        showSuccessToast();
    });

    watch(mensaje, () => {
        if (mensaje.value && mensaje.value[0] === 'Personal agregado con éxito') {
            personal.value = {
                nombre: '',
                direccion: '',
                telefono: '',
                estatus: '0'
            };
        }
    });

</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4 class="text-center">Agregar personal</h4> 
            </div>
            <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Personal agregado con éxito'" role="alert">
            {{  mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Personal agregado con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="personal.nombre" placeholder="Nombre">
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="personal.direccion" placeholder="Direccion">
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="personal.telefono" placeholder="Telefono">
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="personal.estatus" placeholder="Estatus">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="setPersonal(personal)">Agregar</button>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
    
</style>
