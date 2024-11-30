<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePersonal } from '../controladores/usePersonal';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { personalSchema } from '../schemas/PersonalSchema';

const { getPersonalById, updatePersonal, mensaje, personal } = usePersonal();

const route = useRoute();
const router = useRouter();

const disableButton = ref(false);
const tiempo = ref(3);

let idPersona = 0;

onMounted(async () => {
    idPersona = Number(route.params.id);
    await getPersonalById(idPersona);
});

const onValidated = async () => {
    disableButton.value = true;
    await updatePersonal(personal.value[0]);
};

const showErrorToast = () => {
    if (mensaje.value && mensaje.value[0] !== 'Personal actualizado con éxito') {
        errorToast('No se puede actualizar este personal');
    }
};

const showSuccessToast = () => {
    if (mensaje.value && mensaje.value[0] === 'Personal actualizado con éxito') {
        sucessToast('Personal actualizado con éxito');
    }
};

watch(mensaje, () => {
    showErrorToast();
    showSuccessToast();
    timerRedirect();
});

const timerRedirect = () => {
    if (mensaje.value && mensaje.value[0] === 'Personal actualizado con éxito') {
        disableButton.value = true;
        const interval = setInterval(() => {
            if (tiempo.value > 0) {
                tiempo.value -= 1;
            } else {
                clearInterval(interval);
                router.push('/personal');
            }
        }, 1000);
    }
};
</script>

<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="personal[0]">
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <div class="card-header border-custom">
                <h4 class="text-center">Editar personal</h4> 
            </div>
            <div class="alert alert-success text-center mt-3 p-2" v-if="mensaje && mensaje[0] === 'Personal actualizado con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center mt-3 p-2" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Personal actualizado con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <Form :validation-schema="personalSchema" @submit="onValidated">
                    <!-- Nombre -->
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person"></i></span>
                            <Field type="text" class="form-control" name="nombre" v-model="personal[0].nombre" placeholder="Nombre" />
                        </div>
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>

                    <!-- Direccion -->
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Direccion</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-house-door"></i></span>
                            <Field type="text" class="form-control" name="direccion" v-model="personal[0].direccion" placeholder="Direccion" />
                        </div>
                        <ErrorMessage name="direccion" class="errorValidacion" />
                    </div>

                    <!-- Telefono -->
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Telefono</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-telephone-fill"></i></span>
                            <Field type="text" class="form-control" name="telefono" v-model="personal[0].telefono" placeholder="Telefono" />
                        </div>
                        <ErrorMessage name="telefono" class="errorValidacion" />
                    </div>

                    <!-- Estatus -->
                    <div class="mb-3">
                        <label class="form-label">Estatus</label>
                        <div class="form-check">
                            <input type="radio" class="form-check-input" name="estatus" value="1" v-model="personal[0].estatus" />
                            <label class="form-check-label" for="estatusActivo">Activo</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" class="form-check-input" name="estatus" value="0" v-model="personal[0].estatus" />
                            <label class="form-check-label" for="estatusInactivo">Inactivo</label>
                        </div>
                    </div>

                    <!-- Botón -->
                    <div class="mb-3 d-flex justify-content-center">
                        <button type="submit" class="btn border-custom" :disabled="disableButton">Actualizar</button>
                    </div>

                    <div class="text-center" v-if="mensaje && mensaje[0] === 'Personal actualizado con éxito'">
                        Será redirigido en {{ tiempo }} segundos...
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

.border-custom {
    border: 3px solid #ffd700; /* Golden yellow border */
    border-radius: 20px;
    background-color: #fffacd; /* Light yellow background */
}

.small-card {
    max-width: 600px; /* Puedes ajustar este valor según el tamaño que desees */
    width: 100%;
}

.card {
    margin: 0 auto;
    padding: 2rem;
}
</style>