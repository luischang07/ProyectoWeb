<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArticulos } from '../controladores/useArticulos';
import 'vue3-toastify/dist/index.css';

const { getArticulosById, mensaje, deleteArticulos, articulos } = useArticulos();

let idArticulo = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
  () => mensaje.value,
  (newId) => {
    routeRedirect.push('/articulos');
  }
);

onMounted(async () => {
  idArticulo = Number(route.params.id);
  await getArticulosById(idArticulo); // Obtener artículo por ID
});
</script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="articulos[0]">
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      <div class="card-header border-custom">
        <h4 class="text-center">Borrar Artículo</h4>
      </div>
      <div
        class="alert alert-success text-center"
        v-if="mensaje && mensaje[0] === 'Articulo eliminado con éxito'"
        role="alert"
      >
        {{ mensaje[0].toString() }}
      </div>
      <div
        class="alert alert-danger text-center"
        v-for="(error, index) in mensaje"
        :key="index"
        v-if="mensaje && mensaje[0] !== 'Articulo eliminado con éxito'"
        role="alert"
      >
        {{ error }}
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="id">ID</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-hash"></i></span>
            <input
            type="text"
            class="form-control"
            v-model="articulos[0].id"
            placeholder="Id"
            disabled
          />
          </div>

        </div>
        <div class="mb-3">
          <label for="descripcion">Descripción:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-card-text"></i></span>
            <input
            type="text"
            class="form-control"
            v-model="articulos[0].descripcion"
            placeholder="Descripción"
            disabled
          />
          </div>

        </div>
        <div class="mb-3">
          <label for="precio">Precio:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
            <input
            type="number"
            class="form-control"
            v-model="articulos[0].precio"
            placeholder="Precio"
            disabled
          />
          </div>
        </div>
        <div class="mb-3">
          <label for="cantidad_en_almacen">Cantidad en Almacén:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-box"></i></span>
            <input
            type="number"
            class="form-control"
            v-model="articulos[0].cantidad_en_almacen"
            placeholder="Cantidad en Almacén"
            disabled
          />
          </div>
        </div>
        <div class="mb-3">
          <label for="fecha_caducidad">Fecha de Caducidad:</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-calendar2-week"></i></span>
            <input
            type="date"
            class="form-control"
            v-model="articulos[0].fecha_caducidad"
            disabled
          />
          </div>

        </div>
        <div class="mb-3 text-center">
          <button class="btn btn-danger" @click="deleteArticulos(articulos[0])">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-custom {
    border: 3px solid #ff0000;
    border-radius: 20px;
    background-color: #ffcdd2;
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
