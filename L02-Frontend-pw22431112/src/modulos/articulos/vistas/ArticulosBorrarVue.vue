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
  <div class="container mt-5" v-if="articulos[0]">
    <div class="card">
      <div class="card-header">
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
          Id:
          <input
            type="text"
            class="form-control"
            v-model="articulos[0].id"
            placeholder="Id"
            disabled
          />
        </div>
        <div class="mb-3">
          Descripción:
          <input
            type="text"
            class="form-control"
            v-model="articulos[0].descripcion"
            placeholder="Descripción"
            disabled
          />
        </div>
        <div class="mb-3">
          Precio:
          <input
            type="number"
            class="form-control"
            v-model="articulos[0].precio"
            placeholder="Precio"
            disabled
          />
        </div>
        <div class="mb-3">
          Cantidad en Almacén:
          <input
            type="number"
            class="form-control"
            v-model="articulos[0].cantidad_en_almacen"
            placeholder="Cantidad en Almacén"
            disabled
          />
        </div>
        <div class="mb-3">
          Fecha de Caducidad:
          <input
            type="date"
            class="form-control"
            v-model="articulos[0].fecha_caducidad"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="deleteArticulos(articulos[0])">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
