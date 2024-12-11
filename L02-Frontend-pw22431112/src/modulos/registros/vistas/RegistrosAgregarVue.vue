<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRegistros } from '../controladores/useRegistros'; // Aquí puedes tener la función para hacer la petición
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { RegistrosSchema } from '../schemas/RegistrosSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios'; // Para hacer la petición HTTP

const { setRegistro, mensaje } = useRegistros(); // Usamos el controlador de registros

// Definir el estado del formulario
let registro = ref<{
  id_personal: number;
  movimiento: 'entrada' | 'salida';
}>({
  id_personal: 0,
  movimiento: 'entrada',
});

// Definir los datos del personal
let personalList = ref<{ id: string; nombre: string }[]>([]); // Almacena los datos del personal

// Estado para controlar el botón de envío
let isSubmitting = ref(false);

const getPersonal = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/personal/getPersonal');
    personalList.value = response.data.map((item: { id: string; nombre: string }) => ({
      id: item.id,
      nombre: item.nombre,
    }));
  } catch (error) {
    errorToast('Error al obtener el personal');
  }
};

onMounted(() => {
  getPersonal();
});

const onValidated = async () => {
  isSubmitting.value = true;

  const registroData = {
    id_personal: registro.value.id_personal, // Solo se envía la ID
    movimiento: registro.value.movimiento,
  };

  // Llamada a la función para registrar el movimiento
  await setRegistro(registroData);

  isSubmitting.value = false;
};

// Mostrar mensaje de éxito o error
watch(mensaje, () => {
  if (mensaje.value && mensaje.value[0] === 'Registro agregado con éxito') {
    sucessToast('Registro agregado correctamente');
  } else {
    errorToast('No se puede ingresar este registro');
  }
});
</script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
      <div class="card-header border-custom">
        <h4 class="text-center font">Agregar Registro</h4>
      </div>
      <!-- Mensajes de éxito y error -->
      <div class="alert alert-success text-center mt-3" v-if="mensaje && mensaje[0] === 'Registro agregado con éxito'"
        role="alert">
        {{ mensaje[0] }}
      </div>
      <div class="alert alert-danger text-center mt-3" v-for="(error, index) in mensaje" :key="index"
        v-if="mensaje && mensaje[0] !== 'Registro agregado con éxito'" role="alert">
        {{ error }}
      </div>

      <div class="card-body">
        <Form :validation-schema="RegistrosSchema" @submit="onValidated">

          <!-- Selección de Personal -->
          <div class="mb-3">
            <label for="id_personal" class="form-label">Seleccionar Personal</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <Field as="select" name="id_personal" v-model="registro.id_personal" class="form-select">
                <option value="" disabled>Seleccione un personal</option>
                <option v-for="personalItem in personalList" :key="personalItem.id" :value="personalItem.id">
                  {{ personalItem.nombre }}
                </option>
              </Field>
            </div>
            <ErrorMessage name="id_personal" class="errorValidacion" />
          </div>

          <!-- ID Personal (disabled) -->
          <div class="mb-3">
            <label for="id_personal" class="form-label">ID Personal</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-hash"></i></span>
              <Field type="text" class="form-control" name="id_personal" v-model="registro.id_personal" disabled />
            </div>
            <ErrorMessage name="id_personal" class="errorValidacion" />
          </div>

          <!-- Selección de Movimiento (Entrada o Salida) -->
          <div class="mb-3">
            <label for="movimiento" class="form-label">Tipo de Movimiento</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-arrow-right-circle"></i></span>
              <Field as="select" name="movimiento" v-model="registro.movimiento" class="form-select">
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
              </Field>
            </div>
            <ErrorMessage name="movimiento" class="errorValidacion" />
          </div>

          <!-- Botón de Enviar -->
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-success" :disabled="isSubmitting">Agregar Registro</button>
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

.font {
  font-weight: light;
}

.border-custom {
  border: 3px solid #5cb85c;
  /* Verde más oscuro */
  border-radius: 20px;
  background-color: #dff0d8;
  /* Verde claro */
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