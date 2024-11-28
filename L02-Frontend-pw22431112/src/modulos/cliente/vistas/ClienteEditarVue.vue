<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCliente } from '../controladores/useCliente';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { clienteSchema } from '../schemas/ClienteSchema'; // Reutilizando el esquema de validación

const { getClienteById, mensaje, updateCliente, clientes } = useCliente();

let idCliente = 0;
const route = useRoute();

onMounted(async () => {
  idCliente = Number(route.params.id);
  await getClienteById(idCliente); // Obtener cliente por ID
});

const showErrorToast = () => {
  if (mensaje.value && mensaje.value[0] !== 'Cliente actualizado con éxito') {
    errorToast('No se puede actualizar este cliente');
  }
};

const showSuccessToast = () => {
  if (mensaje.value && mensaje.value[0] === 'Cliente actualizado con éxito') {
    sucessToast('Cliente actualizado con éxito');
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
  if (mensaje.value && mensaje.value[0] === 'Cliente actualizado con éxito') {
    disableButton.value = true;
    const interval = setInterval(() => {
      if (tiempo.value > 0) {
        tiempo.value -= 1;
      } else {
        clearInterval(interval);
        router.push('/clientes');
      }
    }, 1000);
  }
};
</script>

<template>
  <div class="container mt-5" v-if="clientes[0]">
    <div class="card">
      <div class="card-header">
        <h4 class="text-center">Editar Cliente</h4>
      </div>
      <div
        class="alert alert-success text-center"
        v-if="mensaje && mensaje[0] === 'Cliente actualizado con éxito'"
        role="alert"
      >
        {{ mensaje[0].toString() }}
      </div>
      <div
        class="alert alert-danger text-center"
        v-for="(error, index) in mensaje"
        :key="index"
        v-if="mensaje && mensaje[0] !== 'Cliente actualizado con éxito'"
        role="alert"
      >
        {{ error }}
      </div>
      <div class="card-body">
        <!-- Formulario con validación -->
        <Form :validation-schema="clienteSchema" @submit="updateCliente(clientes[0])">
          <div class="mb-3">
            Id:
            <input
              type="text"
              class="form-control"
              v-model="clientes[0].id"
              placeholder="Id"
              disabled
            />
          </div>
          <div class="mb-3">
            Nombre
            <Field
              type="text"
              class="form-control"
              name="nombre"
              v-model="clientes[0].nombre"
              placeholder="Nombre"
            />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Dirección
            <Field
              type="text"
              class="form-control"
              name="direccion"
              v-model="clientes[0].direccion"
              placeholder="Dirección"
            />
            <ErrorMessage name="direccion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Teléfono
            <Field
              type="text"
              class="form-control"
              name="telefono"
              v-model="clientes[0].telefono"
              placeholder="Teléfono"
            />
            <ErrorMessage name="telefono" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Correo Electrónico
            <Field
              type="email"
              class="form-control"
              name="correo_electronico"
              v-model="clientes[0].correo_electronico"
              placeholder="Correo Electrónico"
            />
            <ErrorMessage name="correo_electronico" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Ciudad
            <Field
              type="text"
              class="form-control"
              name="ciudad"
              v-model="clientes[0].ciudad"
              placeholder="Ciudad"
            />
            <ErrorMessage name="ciudad" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button
              type="submit"
              class="btn btn-warning"
              :disabled="disableButton"
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

<style scoped>
/* Estilos adicionales si es necesario */
.errorValidacion {
  color: red;
}
</style>
