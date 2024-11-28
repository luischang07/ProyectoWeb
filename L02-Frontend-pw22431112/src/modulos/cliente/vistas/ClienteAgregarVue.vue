<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { ClienteAgregar } from '../interfaces/cliente-interface';
import { useCliente } from '../controladores/useCliente';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { clienteSchema } from '../schemas/ClienteSchema';

const { setCliente, mensaje } = useCliente();

let cliente = ref<ClienteAgregar>({
    nombre: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
    ciudad: ''
});

const onValidated = async () => {
    await setCliente(cliente.value);
};

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
        cliente.value = {
            nombre: '',
            direccion: '',
            telefono: '',
            correo_electronico: '',
            ciudad: ''
        };
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
                <Form :validation-schema="clienteSchema" @submit="onValidated">
                    <div class="mb-3">
                        Nombre
                        <Field 
                            type="text" 
                            class="form-control" 
                            name="nombre" 
                            v-model="cliente.nombre" 
                            placeholder="Nombre"
                        />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección
                        <Field 
                            type="text" 
                            class="form-control" 
                            name="direccion" 
                            v-model="cliente.direccion" 
                            placeholder="Dirección"
                        />
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Teléfono
                        <Field 
                            type="text" 
                            class="form-control" 
                            name="telefono" 
                            v-model="cliente.telefono" 
                            placeholder="Teléfono"
                        />
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Correo Electrónico
                        <Field 
                            type="email" 
                            class="form-control" 
                            name="correo_electronico" 
                            v-model="cliente.correo_electronico" 
                            placeholder="Correo Electrónico"
                        />
                        <ErrorMessage name="correo_electronico" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Ciudad
                        <Field 
                            type="text" 
                            class="form-control" 
                            name="ciudad" 
                            v-model="cliente.ciudad" 
                            placeholder="Ciudad"
                        />
                        <ErrorMessage name="ciudad" class="errorValidacion" />
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
.table-hover tr:hover {
    background-color: #f5f5f5;
}
.errorValidacion{
        color: red;
        font-weight: bold;
    }
</style>
