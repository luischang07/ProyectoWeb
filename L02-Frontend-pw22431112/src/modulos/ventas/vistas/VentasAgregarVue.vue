<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import type { VentaAgregar } from '../interfaces/ventas-interface';
import { useVentas } from '../controladores/useVentas';
import { useArticulos } from '../../articulos/controladores/useArticulos';
import { useCliente } from '../../cliente/controladores/useCliente';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { ventasSchema } from '../schemas/ventasSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';

const { setVenta, mensaje } = useVentas();
const { getAllArticulos, articulos } = useArticulos();
const { getClientes, clientes } = useCliente();

let venta = ref<VentaAgregar>({
    id_articulo: 0,
    id_cliente: 0,
    cantidad: 0,
    precio: 0,
    IVA: 0,
    subtotal: 0,
    total: 0,
    fecha_venta: ''
});

const resetVenta = () => {
    venta.value = {
        id_articulo: 0,
        id_cliente: 0,
        cantidad: 0,
        precio: 0,
        IVA: 0,
        subtotal: 0,
        total: 0,
        fecha_venta: ''
    };
};

const calcularIVA = (precio: number): number => {
    const IVA_RATE = parseFloat(import.meta.env.VITE_IVA_RATE) || 0.16;
    return precio * IVA_RATE;
};

const calcularSubtotal = (cantidad: number, precio: number): number => {
    return cantidad * precio;
};

const calcularTotal = (subtotal: number, IVA: number): number => {
    return subtotal + IVA;
};

watch([() => venta.value.cantidad, () => venta.value.precio], ([newCantidad, newPrecio]) => {
    venta.value.subtotal = calcularSubtotal(newCantidad, newPrecio);
    venta.value.IVA = calcularIVA(venta.value.subtotal);
    venta.value.total = calcularTotal(venta.value.subtotal, venta.value.IVA);
});

watch(() => venta.value.id_articulo, (newIdArticulo) => {
    const selectedArticulo = articulos.value.find(item => item.id === newIdArticulo);
    if (selectedArticulo) {
        venta.value.precio = selectedArticulo.precio;
    }
});

const handleArticuloChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    console.log(target.value);
    venta.value.id_articulo = parseInt(target.value);
};

onMounted(async () => {
    await getAllArticulos();
    await getClientes();
});

const onValidated = async () => {
    venta.value.precio = parseFloat(venta.value.precio.toString());

    if (!venta.value.id_articulo || !venta.value.id_cliente) {
        errorToast('Todos los campos son requeridos');
        return;
    }
    await setVenta(venta.value);
    if (mensaje.value && mensaje.value[0] === 'Venta agregada con éxito') {
        sucessToast('Venta agregada correctamente');
        resetVenta();
    } else {
        errorToast('No se puede ingresar esta venta');
    }
};

watch(mensaje, () => {
    if (mensaje.value && mensaje.value[0] !== 'Venta agregada con éxito') {
        errorToast('No se puede ingresar esta venta');
    }
});
</script>

<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <div class="card-header border-custom">
                <h4 class="text-center font">Agregar venta</h4>
            </div>
            <div class="alert alert-success text-center mt-3"
                v-if="mensaje && mensaje[0] === 'Venta agregada con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center mt-3" v-for="(error, index) in mensaje" :key="index"
                v-if="mensaje && mensaje[0] !== 'Venta agregada con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <!-- Artículo -->
                <div class="mb-3">
                    <label for="articulo" class="form-label">Artículo</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-box-seam"></i></span>
                        <select class="form-select" name="id_articulo" v-model="venta.id_articulo"
                            @change="handleArticuloChange">
                            <option value="" disabled>Seleccione un artículo</option>
                            <option v-for="item in articulos" :key="item.id" :value="item.id">
                                {{ item.descripcion }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Cliente -->
                <div class="mb-3">
                    <label for="cliente" class="form-label">Cliente</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <select class="form-select" name="cliente" v-model="venta.id_cliente">
                            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                                {{ cliente.nombre }}
                            </option>
                        </select>
                    </div>
                </div>

                <Form :validation-schema="ventasSchema" @submit="onValidated">
                    <!-- Cantidad -->
                    <div class="mb-3">
                        <label for="cantidad" class="form-label">Cantidad</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-123"></i></span>
                            <Field type="number" class="form-control" name="cantidad" v-model="venta.cantidad"
                                placeholder="Cantidad" />
                        </div>
                        <ErrorMessage name="cantidad" class="errorValidacion" />
                    </div>

                    <!-- Precio -->
                    <div class="mb-3">
                        <label for="precio" class="form-label">Precio</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="precio" v-model="venta.precio"
                                placeholder="Precio" disabled />
                        </div>
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>

                    <!-- IVA -->
                    <div class="mb-3">
                        <label for="IVA" class="form-label">IVA</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-percent"></i></span>
                            <Field type="number" class="form-control" name="IVA" v-model="venta.IVA" placeholder="IVA"
                                disabled />
                        </div>
                        <ErrorMessage name="IVA" class="errorValidacion" />
                    </div>

                    <!-- Subtotal -->
                    <div class="mb-3">
                        <label for="subtotal" class="form-label">Subtotal</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-calculator"></i></span>
                            <Field type="number" class="form-control" name="subtotal" v-model="venta.subtotal"
                                placeholder="Subtotal" disabled />
                        </div>
                        <ErrorMessage name="subtotal" class="errorValidacion" />
                    </div>

                    <!-- Total -->
                    <div class="mb-3">
                        <label for="total" class="form-label">Total</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-cash-stack"></i></span>
                            <Field type="number" class="form-control" name="total" v-model="venta.total"
                                placeholder="Total" disabled />
                        </div>
                        <ErrorMessage name="total" class="errorValidacion" />
                    </div>

                    <!-- Botón -->
                    <div class="mb-3 d-flex justify-content-center">
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

.font {
    font-weight: light;
}

.border-custom {
    border: 3px solid #5cb85c;
    border-radius: 20px;
    background-color: #dff0d8;
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
