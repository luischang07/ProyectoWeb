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
    <div class="background">
        <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="personal[0]">
            <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
                <div class="card-header border-custom">
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
                        <label for="id">ID</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-hash"></i></span>
                            <input type="text" class="form-control" v-model="personal[0].id" name="id" disabled>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="nombre">Nombre</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person"></i></span>
                            <input type="text" class="form-control" v-model="personal[0].nombre" name="nombre" placeholder="Nombre" disabled>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="direccion">Direccion</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-house-door"></i></span>
                            <input type="text" class="form-control" v-model="personal[0].direccion" name="direccion" placeholder="Direccion" disabled>
                        </div>

                    </div>
                    <div class="mb-3">
                        <label for="telefono">Telefono</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-telephone"></i></span>
                            <input type="text" name="telefono" class="form-control" v-model="personal[0].telefono" placeholder="Telefono" disabled>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="estatus">Estatus</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-braces-asterisk"></i></span>
                            <input type="text" class="form-control" v-model="personal[0].estatus" placeholder="Estatus" disabled>
                        </div>

                    </div>
                    <div class="mb-3 text-center">
                        <button class="btn btn-danger" @click="deletePersonal(personal[0])">Eliminar</button>
                    </div>
                </div>
            </div>    
        </div>
    </div>
</template>

<style scoped>
.border-custom {
    border: 3px solid #ff0000; /* Red border */
    border-radius: 20px;
    background-color: #ffcdd2; /* Light red background */
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
