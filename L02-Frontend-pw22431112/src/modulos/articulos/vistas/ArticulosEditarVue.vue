<template>
  <div class="container mt-5" v-if="articulos[0]">
    <div class="card">
      <div class="card-header">
        <h4 class="text-center">Editar Artículo</h4>
      </div>
      <div
        class="alert alert-success text-center"
        v-if="mensaje && mensaje[0] === 'Articulo actualizado con éxito'"
        role="alert"
      >
        {{ mensaje[0].toString() }}
      </div>
      <div
        class="alert alert-danger text-center"
        v-for="(error, index) in mensaje"
        :key="index"
        v-if="mensaje && mensaje[0] !== 'Articulo actualizado con éxito'"
        role="alert"
      >
        {{ error }}
      </div>
      <div class="card-body">
        <!-- Formulario con validación -->
        <Form :validation-schema="ArticuloEditarSchema" @submit="updateArticulos(articulos[0])">
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
            <Field
              type="text"
              class="form-control"
              name="descripcion"
              v-model="articulos[0].descripcion"
              placeholder="Descripción"
            />
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Precio:
            <Field
              type="number"
              class="form-control"
              name="precio"
              v-model="precioFloat"
              placeholder="Precio"
            />
            <ErrorMessage name="precio" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Cantidad en Almacén:
            <Field
              type="number"
              class="form-control"
              name="cantidad_en_almacen"
              v-model="articulos[0].cantidad_en_almacen"
              placeholder="Cantidad en Almacén"
            />
            <ErrorMessage name="cantidad_en_almacen" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Fecha de Caducidad:
            <Field
              type="date"
              class="form-control"
              name="fecha_caducidad"
              v-model="articulos[0].fecha_caducidad"
            />
            <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button
              type="submit"
              class="btn btn-warning"
              :disabled="disableButton"
              @click="updateArticulos(articulos[0])"
            >
              Actualizar
            </button>
            <p v-if="disableButton">Redirigiendo en {{ tiempo }}...</p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useArticulos } from '../controladores/useArticulos';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ArticuloEditarSchema } from '../schemas/ArticuloSchema'; // Reutilizando el esquema de validación

const { getArticulosById, mensaje, updateArticulos, articulos } = useArticulos();

let idArticulo = 0;
const route = useRoute();

onMounted(async () => {
  idArticulo = Number(route.params.id);
  await getArticulosById(idArticulo); // Obtener artículo por ID
});


const showErrorToast = () => {
  if (mensaje.value && mensaje.value[0] !== 'Articulo actualizado con éxito') {
    errorToast('No se puede actualizar este artículo');
  }
};

// Computed para obtener el precio como flotante
const precioFloat = computed({
  get: () => {
    const precio = articulos.value[0]?.precio;
    return typeof precio === 'string' ? parseFloat(precio) : precio ?? 0;
  },
  set: (value: number) => {
    if (articulos.value[0]) {
      articulos.value[0].precio = parseFloat(value.toString());
    }
  }
});

const showSuccessToast = () => {
  if (mensaje.value && mensaje.value[0] === 'Articulo actualizado con éxito') {
    sucessToast('Artículo actualizado con éxito');
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
  if (mensaje.value && mensaje.value[0] === 'Artículo actualizado con éxito') {
    disableButton.value = true;
    const interval = setInterval(() => {
      if (tiempo.value > 0) {
        tiempo.value -= 1;
      } else {
        clearInterval(interval);
        router.push('/articulos');
      }
    }, 1000);
  }
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
.errorValidacion {
  color: red;
}
</style>
