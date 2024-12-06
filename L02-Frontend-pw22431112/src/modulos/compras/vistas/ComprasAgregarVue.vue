<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import type { CompraAgregar } from '../interfaces/compras-interface';
import { useCompras } from '../controladores/useCompras';
import { useArticulos } from '../../articulos/controladores/useArticulos';
import { errorToast, sucessToast } from '@/modulos/utils/displayToast';
import { CompraAgregarSchema } from '../schemas/CompraSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';
import type { Articulos } from '@/modulos/articulos/interfaces/articulos-interface';

const { setCompras, mensaje, compras } = useCompras();
const { getAllArticulos, articulos } = useArticulos(); // Traemos articulos de useArticulos

let articulo = ref<Articulos>({
    id: 0,
    descripcion: '',
    precio: 0,
    cantidad_en_almacen: 0,
    fecha_caducidad: null
});

let compra = ref<CompraAgregar>({
    id_articulo: 0,
    cantidad: 0,
    precio: 0,
    IVA: 0,
    subtotal: 0,
    total: 0,
    fecha_compra: null
});

// Función para calcular el IVA (16%)
const calcularIVA = (precio: number): number => {
    return precio * 0.16;
};

// Función para calcular el subtotal
const calcularSubtotal = (cantidad: number, precio: number): number => {
    return cantidad * precio;
};

const calcularTotal = (subtotal: number, IVA: number): number => {
    return subtotal + IVA;
};

// Watch en cantidad y precio para actualizar subtotal e IVA
watch([() => compra.value.cantidad, () => compra.value.precio], ([newCantidad, newPrecio]) => {
    compra.value.subtotal = calcularSubtotal(newCantidad, newPrecio);
    compra.value.IVA = calcularIVA(compra.value.subtotal);
    compra.value.total = calcularTotal(compra.value.subtotal, compra.value.IVA);
});

onMounted(async () => {
    await getAllArticulos(); // Obtenemos todos los artículos al montar el componente
});

// Watch para actualizar el id_articulo en compra cuando cambia la descripción seleccionada
watch(() => articulo.value.descripcion, (newDescripcion) => {
    const selectedArticulo = articulos.value.find(item => item.descripcion === newDescripcion);
    if (selectedArticulo) {
        articulo.value.id = selectedArticulo.id;
        compra.value.id_articulo = selectedArticulo.id; // Sincronizamos el id_articulo
    }
});

// Función de validación y envío de datos
const onValidated = async () => {
    console.log("Desde onValidated");
    console.log(compra.value.total);
    // Solo enviamos los campos necesarios
    const compraData = {
        id_articulo: compra.value.id_articulo, // Usamos el id_articulo de compra
        cantidad: compra.value.cantidad,
        precio: compra.value.precio,
        IVA: compra.value.IVA,
        subtotal: compra.value.subtotal,
        total: compra.value.total,
        fecha_compra: compra.value.fecha_compra
    };

    // Enviamos los datos al backend o a donde sea necesario
    await setCompras(compraData);
};

// Mostrar mensajes de error o éxito
const showToast = () => {
    if (mensaje.value) {
        if (mensaje.value[0] === 'Compra agregada con éxito') {
            sucessToast('Compra agregada correctamente');
        } else {
            errorToast('No se puede ingresar esta compra');
        }
    }
};

watch(mensaje, showToast);
</script>

<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <div class="card-header border-custom">
                <h4 class="text-center">Agregar Compra</h4>
            </div>
            <div class="alert alert-success text-center mt-3 p-2" v-if="mensaje && mensaje[0] === 'Compra agregada con éxito'" role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center mt-3 p-2" v-for="(error, index) in mensaje" :key="index" v-if="mensaje && mensaje[0] !== 'Compra agregada con éxito'" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <!-- Descripción Articulo -->
                <div class="mb-3">
                    <label for="descripcion">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-card-heading"></i></span>
                        <select class="form-select" name="descripcion" v-model="articulo.descripcion">
                            <option v-for="item in articulos" :key="item.id" :value="item.descripcion">
                                {{ item.descripcion }}
                            </option>
                        </select>
                    </div>
                </div>
                <Form :validation-schema="CompraAgregarSchema" @submit="onValidated">
                    <!-- ID Articulo -->
                    <div class="mb-3">
                        <label for="id">ID Articulo</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-hash"></i></span>
                            <Field type="text" class="form-control" name="id_articulo" v-model="compra.id_articulo" placeholder="ID Articulo" disabled />
                        </div>
                        <ErrorMessage name="id_articulo" class="errorValidacion" />
                    </div>
                    <!-- Cantidad a añadir -->
                    <div class="mb-3">
                        <label for="cantidad">Cantidad</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-box"></i></span>
                            <Field type="number" class="form-control" name="cantidad" v-model="compra.cantidad" placeholder="Cantidad" />
                        </div>
                        <ErrorMessage name="cantidad" class="errorValidacion" />
                    </div>
                    <!-- Precio -->
                    <div class="mb-3">
                        <label for="precio">Precio</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="precio" v-model="compra.precio" placeholder="Cantidad" />
                        </div>
                        <ErrorMessage name="precio" class="errorValidacion" />
                    </div>
                    <!-- IVA -->
                    <div class="mb-3">
                        <label for="IVA">IVA</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="IVA" v-model="compra.IVA" placeholder="IVA" disabled/>
                        </div>
                    </div>
                    <!-- Subtotal -->
                    <div class="mb-3">
                        <label for="subtotal">Subtotal</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="subtotal" v-model="compra.subtotal" placeholder="Subtotal" disabled/>
                        </div>
                    </div>
                    <!-- Total -->
                    <div class="mb-3">
                        <label for="total">Total</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                            <Field type="number" class="form-control" name="total" v-model="compra.total" placeholder="Total" disabled/>
                        </div>
                    </div>
                    <!-- Fecha de Compra -->
                    <div class="mb-3">
                        <label for="fecha_compra">Fecha de Compra</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                            <Field type="date" class="form-control" name="fecha_compra" v-model="compra.fecha_compra" />
                        </div>
                    </div>
                    <!-- Botón de Enviar -->
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-success">Agregar Compra</button>
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
