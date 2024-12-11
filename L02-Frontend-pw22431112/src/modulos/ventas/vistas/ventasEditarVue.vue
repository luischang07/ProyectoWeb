<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVentas } from '../controladores/useVentas';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ventasSchema } from '../schemas/ventasSchema';

const { getVentaById, updateVenta, mensaje, ventas } = useVentas();

const route = useRoute();
const router = useRouter();

const disableButton = ref(false);
const tiempo = ref(3);

let idVenta = 0;

onMounted(async () => {
    idVenta = Number(route.params.id);
    await getVentaById(idVenta);
    console.log(ventas);
});

const onValidated = async () => {
    disableButton.value = true;
    ventas.value[0].id_articulo = parseInt(ventas.value[0].id_articulo.toString());
    ventas.value[0].id_cliente = parseInt(ventas.value[0].id_cliente.toString());
    ventas.value[0].cantidad = parseInt(ventas.value[0].cantidad.toString());
    ventas.value[0].precio = parseFloat(ventas.value[0].precio.toString());
    ventas.value[0].IVA = parseFloat(ventas.value[0].IVA.toString());
    ventas.value[0].subtotal = parseFloat(ventas.value[0].subtotal.toString());
    ventas.value[0].total = parseFloat(ventas.value[0].total.toString());
    await updateVenta(ventas.value[0]);
};

const showErrorToast = () => {
    if (mensaje.value && mensaje.value[0] !== 'Venta actualizada con éxito') {
        errorToast('No se puede actualizar esta venta');
    }
};

const showSuccessToast = () => {
    if (mensaje.value && mensaje.value[0] === 'Venta actualizada con éxito') {
        sucessToast('Venta actualizada con éxito');
    }
};

watch(mensaje, () => {
    showErrorToast();
    showSuccessToast();
    timerRedirect();
});

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const timerRedirect = () => {
    if (mensaje.value && mensaje.value[0] === 'Venta actualizada con éxito') {
        disableButton.value = true;
        const interval = setInterval(() => {
            if (tiempo.value > 0) {
                tiempo.value -= 1;
            } else {
                clearInterval(interval);
                router.push('/ventas');
            }
        }, 1000);
    }
};
</script>

<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="ventas[0]">
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <div class="card-header border-custom">
                <h4 class="text-center">Editar venta</h4>
            </div>
            <div class="alert alert-success text-center mt-3 p-2"
                v-if="mensaje && mensaje[0] === 'Venta actualizada con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center mt-3 p-2" v-for="(error, index) in mensaje" :key="index"
                v-if="mensaje && mensaje[0] !== 'Venta actualizada con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <Form :validation-schema="ventasSchema" @submit="onValidated">
                    <!-- ID Artículo -->
                    <div class="mb-3">
                        <label for="id_articulo" class="form-label">ID Artículo</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-box-seam"></i></span>
                            <Field type="number" class="form-control" name="id_articulo" v-model="ventas[0].id_articulo"
                                placeholder="ID Artículo" />
                        </div>
                        <ErrorMessage name="id_articulo" class="errorValidacion" />
                    </div>

                    <!-- ID Cliente -->
                    <div class="mb-3">
                        <label for="id_cliente" class="form-label">ID Cliente</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person"></i></span>
                            <Field type="number" class="form-control" name="id_cliente" v-model="ventas[0].id_cliente"
                                placeholder="ID Cliente" />
                        </div>
                        <ErrorMessage name="id_cliente" class="errorValidacion" />
                    </div>

                    <!-- Cantidad -->
                    <div class="mb-3">
                        <label for="cantidad" class="form-label">Cantidad</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-123"></i></span>
                            <Field type="number" class="form-control" name="cantidad" v-model="ventas[0].cantidad"
                                placeholder="Cantidad" />
                        </div>
                        <ErrorMessage name="cantidad" class="errorValidacion" />
                    </div>

                    <!-- Precio -->
                    <div class="mb-3">
                        <label for="precio" class="form-label">Precio</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="precio" v-model="ventas[0].precio"
                                placeholder="Precio" />
                        </div>
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>

                    <!-- IVA -->
                    <div class="mb-3">
                        <label for="IVA" class="form-label">IVA</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-percent"></i></span>
                            <Field type="number" class="form-control" name="IVA" v-model="ventas[0].IVA"
                                placeholder="IVA" />
                        </div>
                        <ErrorMessage name="IVA" class="errorValidacion" />
                    </div>

                    <!-- Subtotal -->
                    <div class="mb-3">
                        <label for="subtotal" class="form-label">Subtotal</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-calculator"></i></span>
                            <Field type="number" class="form-control" name="subtotal" v-model="ventas[0].subtotal"
                                placeholder="Subtotal" />
                        </div>
                        <ErrorMessage name="subtotal" class="errorValidacion" />
                    </div>

                    <!-- Total -->
                    <div class="mb-3">
                        <label for="total" class="form-label">Total</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-cash-stack"></i></span>
                            <Field type="number" class="form-control" name="total" v-model="ventas[0].total"
                                placeholder="Total" />
                        </div>
                        <ErrorMessage name="total" class="errorValidacion" />
                    </div>

                    <!-- Fecha Venta -->
                    <div class="mb-3">
                        <label for="fecha_venta" class="form-label">Fecha Venta</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                            <Field type="date" class="form-control" name="fecha_venta" v-model="ventas[0].fecha_venta"
                                placeholder="Fecha Venta" />
                        </div>
                        <ErrorMessage name="fecha_venta" class="errorValidacion" />
                    </div>

                    <!-- Botón -->
                    <div class="mb-3 d-flex justify-content-center">
                        <button type="submit" class="btn border-custom" :disabled="disableButton">Actualizar</button>
                    </div>

                    <div class="text-center" v-if="mensaje && mensaje[0] === 'Venta actualizada con éxito'">
                        Será redirigido en {{ tiempo }} segundos...
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
    border: 3px solid #ffd700;
    border-radius: 20px;
    background-color: #fffacd;
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
