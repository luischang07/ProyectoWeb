<script lang="ts" setup>
import { onMounted, ref , watch } from 'vue';
import { useRoute , useRouter } from 'vue-router';
import { usePersonal } from '../controladores/usePersonal';
import 'vue3-toastify/dist/index.css';
const {getPersonalById , deletePersonal , mensaje, personal} = usePersonal();

    let idPersona = 0;
    const route = useRoute();
    const routeRedirect = useRouter();

    watch(
        () => mensaje.value,
        newId =>{
            routeRedirect.push('/personal');
        }
    )

    onMounted(async () => {
        idPersona = Number(route.params.id);
        await getPersonalById(Number(idPersona));
    });
</script>

<template>
    <div class="container mt-5" v-if="personal[0]">
        <div class="card">
            <div class="card-header">
                <h4 class="text-center">Borrar personal</h4> 
            </div>
            <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Personal eliminado con éxito'" role="alert">
            {{  mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== ''" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id:
                    <input type="text" class="form-control" v-model="personal[0].id" placeholder="Nombre" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="personal[0].nombre" placeholder="Nombre" disabled>
                </div>
                <div class="mb-3">
                    Direccion
                    <input type="text" class="form-control" v-model="personal[0].direccion" placeholder="Direccion" disabled>
                </div>
                <div class="mb-3">
                    Telefono
                    <input type="text" class="form-control" v-model="personal[0].telefono" placeholder="Telefono" disabled>
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="personal[0].estatus" placeholder="Estatus" disabled>
                </div>
                <div class="mb-3">
                    <button class="btn btn-danger"  @click="deletePersonal(personal[0])">Eliminar</button>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
    
</style>
