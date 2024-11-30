<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { ArticulosAgregar } from '../interfaces/articulos-interface';
import { useArticulos } from '../controladores/useArticulos';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { ArticuloAgregarSchema } from '../schemas/ArticuloSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';

const { setArticulos, mensaje } = useArticulos();

let articulo = ref<ArticulosAgregar>({
  descripcion: '',
  precio: 0,
  cantidad_en_almacen: 0,
  fecha_caducidad: null
});


const onValidated = async () => {
  await setArticulos(articulo.value);
  articulo.value = {
    descripcion: '',
    precio: 0,
    cantidad_en_almacen: 0,
    fecha_caducidad: null
  };
};

const showErrorToast = () => {
  if (mensaje.value && mensaje.value[0] !== 'Articulo agregado con éxito') {
    errorToast('No se puede ingresar este artículo');
  }
};

const showSuccessToast = () => {
  if (mensaje.value && mensaje.value[0] === 'Articulo agregado con éxito') {
    sucessToast('Artículo agregado correctamente');
  }
};

watch(mensaje, () => {
  showErrorToast();
  showSuccessToast();
});
</script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      <div class="card-header border-custom">
        <h4 class="text-center">Agregar Artículo</h4>
      </div>
      <div class="alert alert-success text-center mt-3 p-2" v-if="mensaje && mensaje[0] === 'Articulo agregado con éxito'" role="alert">
        {{ mensaje[0].toString() }}
      </div>
      <div class="alert alert-danger text-center mt-3 p-2" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Articulo agregado con éxito'" role="alert">
        {{ error }}
      </div>
      <div class="card-body">
        <Form :validation-schema="ArticuloAgregarSchema" @submit="onValidated">
          <!-- Descripción -->
          <div class="mb-3">
            <label for="descripcion">Descripción</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-card-heading"></i></span>
              <Field type="text" class="form-control" name="descripcion" v-model="articulo.descripcion" placeholder="Descripción" />
            </div>
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>
          <!-- Precio -->
          <div class="mb-3">
            <label for="precio">Precio</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
              <Field type="number" class="form-control" name="precio" v-model="articulo.precio" placeholder="Precio" />
            </div>
            <ErrorMessage name="precio" class="errorValidacion" />
          </div>
          <!-- Cantidad en Almacén -->
          <div class="mb-3">
            <label for="cantidad_en_almacen">Cantidad en Almacén</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-box"></i></span>
              <Field type="number" class="form-control" name="cantidad_en_almacen" v-model="articulo.cantidad_en_almacen" placeholder="Cantidad en Almacén" />
            </div>
            <ErrorMessage name="cantidad_en_almacen" class="errorValidacion" />
          </div>
          <!-- Fecha de Caducidad -->
          <div class="mb-3">
            <label for="fecha_caducidad">Fecha de Caducidad</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-calendar2-week"></i></span>
              <Field type="date" class="form-control" name="fecha_caducidad" v-model="articulo.fecha_caducidad" placeholder="Fecha de Caducidad" />
            </div>
            <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
          </div>
          <!-- Botón de Agregar -->
          <div class="mb-3 text-center">
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

.border-custom {
    border: 3px solid #5cb85c; /* Un verde más oscuro para el borde */
    border-radius: 20px;
    background-color: #dff0d8; /* Un verde claro que combina bien */
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
