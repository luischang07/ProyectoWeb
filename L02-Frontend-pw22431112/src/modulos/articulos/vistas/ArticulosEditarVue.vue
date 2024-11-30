<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="articulos[0]">
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      <div class="card-header border-custom">
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
        <Form :validation-schema="ArticuloEditarSchema" @submit="onValidated">
          <!-- descripcion -->
          <div class="mb-3">
            <label for="descripcion">Descripción</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-card-heading"></i></span>
              <Field type="text" class="form-control" name="descripcion" v-model="articulos[0].descripcion" placeholder="Descripción" />
            </div>
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>
          <!-- Precio -->
          <div class="mb-3">
            <label for="precio">Precio</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
              <Field type="number" class="form-control" name="precio" v-model="articulos[0].precio" placeholder="Precio" />
            </div>
            <ErrorMessage name="precio" class="errorValidacion" />
          </div>
          <!-- Cantidad en Almacén -->
          <div class="mb-3">
            <label for="cantidad_en_almacen">Cantidad en Almacén</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-box"></i></span>
              <Field type="number" class="form-control" name="cantidad_en_almacen" v-model="articulos[0].cantidad_en_almacen" placeholder="Cantidad en Almacén" />
            </div>
            <ErrorMessage name="cantidad_en_almacen" class="errorValidacion" />
          </div>
          <!-- Fecha de Caducidad -->
          <div class="mb-3">
            <label for="fecha_caducidad">Fecha de Caducidad</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-calendar2-week"></i></span>
              <Field type="date" class="form-control" name="fecha_caducidad" v-model="articulos[0].fecha_caducidad" placeholder="Fecha de Caducidad" />
            </div>
            <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
          </div>
          <div class="mb-3 text-center">
            <button type="submit" class="btn border-custom">Actualizar</button>
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


const onValidated = async () => {
  await updateArticulos(articulos.value[0]);
};

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
