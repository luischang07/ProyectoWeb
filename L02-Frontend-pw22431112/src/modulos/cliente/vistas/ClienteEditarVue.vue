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
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-10" v-if="clientes[0]">
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      <div class="card-header border-custom">
        <h4 class="text-center">Editar Cliente</h4>
      </div>
      <div
        class="alert alert-success text-center mt-3 p-2"
        v-if="mensaje && mensaje[0] === 'Cliente actualizado con éxito'"
        role="alert"
      >
        {{ mensaje[0].toString() }}
      </div>
      <div
        class="alert alert-danger text-center mt-3 p-2"
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
          <!-- ID -->
          <div class="mb-3">
            <label for="id" class="form-label">ID</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-hash"></i></span>
              <input
              type="text"
              class="form-control"
              v-model="clientes[0].id"
              placeholder="Id"
              disabled
            />
            </div>
          </div>
          <!-- Nombre -->
          <div class="mb-3">
            <label for="nombre" class="form-label"> Nombre</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <Field
              type="text"
              class="form-control"
              name="nombre"
              v-model="clientes[0].nombre"
              placeholder="Nombre"
            />
            </div>
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <!-- Direccion -->
          <div class="mb-3">
            <label for="direccion" class="form-label"> Direccion</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-house-door"></i></span>
              <Field
              type="text"
              class="form-control"
              name="direccion"
              v-model="clientes[0].direccion"
              placeholder="Dirección"
            />
            </div>
            <ErrorMessage name="direccion" class="errorValidacion" />
          </div>
          <!-- Telefono -->
          <div class="mb-3">
            <label for="telefono" class="form-label"> Telefono</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-telephone"></i></span>
              <Field
              type="text"
              class="form-control"
              name="telefono"
              v-model="clientes[0].telefono"
              placeholder="Teléfono"
            />
            </div>
            <ErrorMessage name="telefono" class="errorValidacion" />
          </div>
          <!-- Correo Electrónico -->
          <div class="mb-3">
            <label for="correo_electronico" class="form-label"> Correo Electrónico</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope"></i></span>
              <Field
              type="email"
              class="form-control"
              name="correo_electronico"
              v-model="clientes[0].correo_electronico"
              placeholder="Correo Electrónico"
            />
            </div>
            <ErrorMessage name="correo_electronico" class="errorValidacion" />
          </div>
          <!-- Ciudad -->
          <div class="mb-3">
            <label for="ciudad" class="form-label"> Ciudad</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
              <Field
              type="text"
              class="form-control"
              name="ciudad"
              v-model="clientes[0].ciudad"
              placeholder="Ciudad"
            />
            </div>
          </div>
          <!-- Botón -->
          <div class="mb-3 text-center">
            <button
              type="submit"
              class="btn btn-warning"
              :disabled="disableButton"
            >
              Actualizar
            </button>
          </div>
          <p class="text-center" v-if="disableButton">Redirigiendo en {{ tiempo }}...</p>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
