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
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <div class="card-header border-custom">
                <h4 class="text-center">Agregar Cliente</h4> 
            </div>
            <div class="alert alert-success text-center mt-3 p-2" v-if="mensaje && mensaje[0] === 'Cliente agregado con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center mt-3 p-2" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Cliente agregado con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <Form :validation-schema="clienteSchema" @submit="onValidated">
                    <!-- Nombre -->
                    <div class="mb-3">
                        <label for="nombre">Nombre</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person"></i></span>
                            <Field type="text" class="form-control" name="nombre" v-model="cliente.nombre" placeholder="Nombre"/>
                        </div>
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>

                    <!-- Direccion -->
                    <div class="mb-3">
                        <label for="direccion">Direccion</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-house-door"></i></span>
                            <Field type="text" class="form-control" name="direccion" v-model="cliente.direccion" placeholder="Dirección"/>
                        </div>
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>

                    <!-- Telefono -->
                    <div class="mb-3">
                        <label for="telefono">Teléfono</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-telephone"></i></span>
                            <Field type="text" class="form-control" name="telefono" v-model="cliente.telefono" placeholder="Teléfono"/>
                        </div>
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>

                    <!-- Correo Electrónico -->
                    <div class="mb-3">
                        <label for="correo_electronico">Correo Electrónico</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                            <Field type="email" class="form-control" name="correo_electronico" v-model="cliente.correo_electronico" placeholder="Correo Electrónico"/>
                        </div>
                        <ErrorMessage name="correo_electronico" class="errorValidacion" />
                    </div>

                    <!-- Ciudad -->
                    <div class="mb-3">
                        <label for="ciudad">Ciudad</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
                            <Field type="text" class="form-control" name="ciudad" v-model="cliente.ciudad" placeholder="Ciudad"/> 
                        </div>
                        <ErrorMessage name="ciudad" class="errorValidacion" />
                    </div>

                    <!-- Botón -->
                    <div class="mb-3 text-center    ">
                        <button type="submit" class="btn btn-success">Agregar</button>
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

.border-custom {
    border: 3px solid #5cb85c; 
    border-radius: 20px;
    background-color: #dff0d8; 
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
