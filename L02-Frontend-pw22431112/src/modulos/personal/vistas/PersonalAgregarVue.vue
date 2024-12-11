<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { PersonalAgregar } from '../interfaces/Personal-interface';
import { usePersonal } from '../controladores/usePersonal';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
const { setPersonal, mensaje } = usePersonal();
import { personalSchema } from '../schemas/PersonalSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';

let personal = ref<PersonalAgregar>({
    nombre: '',
    direccion: '',
    telefono: '',
    estatus: '0'
});

const resetPersonal = () => {
    personal.value = {
        nombre: '',
        direccion: '',
        telefono: '',
        estatus: '0'
    };
};

const onValidated = async () => {
    await setPersonal(personal.value);
    if (mensaje.value && mensaje.value[0] === 'Personal agregado con éxito') {
        sucessToast('Personal agregado correctamente');
        resetPersonal();
    } else {
        errorToast('No se puede ingresar este personal');
    }
};

watch(mensaje, () => {
    if (mensaje.value && mensaje.value[0] !== 'Personal agregado con éxito') {
        errorToast('No se puede ingresar este personal');
    }
});
</script>

<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <div class="card-header border-custom">
                <h4 class="text-center font">Agregar personal</h4>
            </div>
            <div class="alert alert-success text-center mt-3"
                v-if="mensaje && mensaje[0] === 'Personal agregado con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center mt-3" v-for="(error, index) in mensaje" :key="index"
                v-if="mensaje && mensaje[0] !== 'Personal agregado con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <Form :validation-schema="personalSchema" @submit="onValidated">
                    <!-- Nombre -->
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person"></i></span>
                            <Field type="text" class="form-control" name="nombre" v-model="personal.nombre"
                                placeholder="Nombre" />
                        </div>
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>

                    <!-- Direccion -->
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Direccion</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-house-door"></i></span>
                            <Field type="text" class="form-control" name="direccion" v-model="personal.direccion"
                                placeholder="Direccion" />
                        </div>
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>

                    <!-- Telefono -->
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Telefono</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-telephone-fill"></i></span>
                            <Field type="text" class="form-control" name="telefono" v-model="personal.telefono"
                                placeholder="Telefono" />
                        </div>
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>

                    <!-- Estatus -->
                    <div class="mb-3">
                        <label for="estatusActivo" class="form-label">Estatus</label>
                        <div class="form-check">
                            <Field type="radio" class="form-check-input" id="estatusActivo" name="estatus" value="1"
                                v-model="personal.estatus" />
                            <label class="form-check-label" for="estatusActivo">Activo</label>
                        </div>
                        <div class="form-check">
                            <Field type="radio" class="form-check-input" id="estatusInactivo" name="estatus" value="0"
                                v-model="personal.estatus" />
                            <label class="form-check-label" for="estatusInactivo">Inactivo</label>
                        </div>
                        <ErrorMessage name="estatus" class="errorValidacion" />
                    </div>

                    <!-- Botón -->
                    <div class="mb-3 d-flex justify-content-center">
                        <button type="submit" class="btn btn-success">Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}

.font {
    font-weight: light;
}

.border-custom {
    border: 3px solid #5cb85c;
    /* Un verde más oscuro para el borde */
    border-radius: 20px;
    background-color: #dff0d8;
    /* Un verde claro que combina bien */
}

.small-card {
    max-width: 600px;
    /* Puedes ajustar este valor según el tamaño que desees */
    width: 100%;
}

.card {
    margin: 0 auto;
    padding: 2rem;
}
</style>
