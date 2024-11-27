<script lang="ts" setup>
import { ref , watch } from 'vue';
import type { PersonalAgregar } from '../interfaces/Personal-interface';
import { usePersonal } from '../controladores/UsePersonal';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
const {setPersonal, mensaje} = usePersonal();
import { personalSchema } from '../schemas/PersonalSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';

    let personal = ref<PersonalAgregar>({
        nombre: '',
        direccion: '',
        telefono: '',
        estatus: '0'
        });

    const onValidated = async () => {
        await setPersonal(personal.value);
    };
    
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
                <Form :validation-schema="personalSchema" @submit="onValidated">
                    <div class="mb-3">
                        Nombre
                        <Field type="text" class="form-control" name="nombre" v-model="personal.nombre" placeholder="Nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Direccion
                        <Field type="text" class="form-control" name="direccion" v-model="personal.direccion" placeholder="Direccion" />
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field type="text" class="form-control" name="telefono" v-model="personal.telefono" placeholder="Telefono" />
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <Field type="text" class="form-control" name="estatus" v-model="personal.estatus" placeholder="Estatus" />
                        <ErrorMessage name="estatus" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Agregar</button>
                    </div>
                </Form>
            </div>                
        </div>    
    </div>
</template>

<style scoped>
    .errorValidacion{
        color: red;
        font-weight: bold;
    }
</style>
