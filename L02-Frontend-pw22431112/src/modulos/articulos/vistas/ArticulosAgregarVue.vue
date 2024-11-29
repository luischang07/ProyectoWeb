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
  fecha_caducidad: ''
});

const onValidated = async () => {
  await setArticulos(articulo.value);
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
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4 class="text-center">Agregar artículo</h4>
      </div>
      <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Articulo agregado con éxito'" role="alert">
        {{ mensaje[0].toString() }}
      </div>
      <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Articulo agregado con éxito'" role="alert">
        {{ error }}
      </div>
      <div class="card-body">
        <Form :validation-schema="ArticuloAgregarSchema" @submit="onValidated">
          <div class="mb-3">
            Descripción
            <Field type="text" class="form-control" name="descripcion" v-model="articulo.descripcion" placeholder="Descripción" />
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Precio
            <Field type="number" class="form-control" name="precio" v-model="articulo.precio" placeholder="Precio" />
            <ErrorMessage name="precio" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Cantidad en Almacén
            <Field type="number" class="form-control" name="cantidad_en_almacen" v-model="articulo.cantidad_en_almacen" placeholder="Cantidad en Almacén" />
            <ErrorMessage name="cantidad_en_almacen" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Fecha de Caducidad
            <Field type="date" class="form-control" name="fecha_caducidad" v-model="articulo.fecha_caducidad" placeholder="Fecha de Caducidad" />
            <ErrorMessage name="fecha_caducidad" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary">Agregar</button>
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
</style>
