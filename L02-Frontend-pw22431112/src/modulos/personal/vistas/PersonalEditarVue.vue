<script lang="ts" setup>
import { onMounted, ref , watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePersonal } from '../controladores/usePersonal';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
const {getPersonalById , updatePersonal , mensaje, personal} = usePersonal();

let idPersona = 0;
const route = useRoute();

onMounted(async () => {
    idPersona = Number(route.params.id);
    await getPersonalById(Number(idPersona));
});

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
});

const router = useRouter();

const disableButton = ref(false);
const tiempo = ref(3);

watch(mensaje, () => {
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
    <div class="container mt-5" v-if="personal[0]">
        <div class="card">
            <div class="card-header">
                <h4 class="text-center">Editar personal</h4> 
            </div>
            <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Personal actualizado con éxito'" role="alert">
            {{  mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Personal actualizado con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id:
                    <input type="text" class="form-control" v-model="personal[0].id" placeholder="Nombre" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="personal[0].nombre" placeholder="Nombre">
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="personal[0].direccion" placeholder="Direccion">
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="personal[0].telefono" placeholder="Telefono">
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="personal[0].estatus" placeholder="Estatus">
                </div>
                <div class="mb-3">
                    <button class="btn btn-warning" @click="updatePersonal(personal[0])" :disabled="disableButton">Actualizar</button>
                    <p v-if="disableButton">Redirigiendo en {{ tiempo }}...</p>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
    
</style>
