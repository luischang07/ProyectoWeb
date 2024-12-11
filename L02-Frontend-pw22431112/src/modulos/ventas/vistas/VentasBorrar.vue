<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVentas } from '../controladores/useVentas';
import 'vue3-toastify/dist/index.css';
const { getVentaById, deleteVenta, mensaje, ventas } = useVentas();

let idVenta = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
    () => mensaje.value,
    newId => {
        routeRedirect.push('/ventas');
    }
)

onMounted(async () => {
    idVenta = Number(route.params.id);
    await getVentaById(Number(idVenta));
});
</script>

<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100" v-if="ventas[0]">
        <div class="card w-100 col-lg-8 col-md-10 col-sm-12 shadow-lg bg-light small-card">
            <div class="card-header border-custom">
                <h4 class="text-center">Borrar venta</h4>
            </div>
            <div class="alert alert-success text-center" v-if="mensaje && mensaje[0] === 'Venta eliminada con éxito'"
                role="alert">
                {{ mensaje[0].toString() }}
            </div>
            <div class="alert alert-danger text-center" v-for="(error, index) in mensaje" :key="index"
                v-if="mensaje && mensaje[0] !== ''" role="alert">
                {{ error }}
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="id">ID</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-hash"></i></span>
                        <input type="text" class="form-control" v-model="ventas[0].id" name="id" disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="id_articulo">ID Artículo</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-box-seam"></i></span>
                        <input type="text" class="form-control" v-model="ventas[0].id_articulo" name="id_articulo"
                            placeholder="ID Artículo" disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="id_cliente">ID Cliente</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                        <input type="text" class="form-control" v-model="ventas[0].id_cliente" name="id_cliente"
                            placeholder="ID Cliente" disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="cantidad">Cantidad</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-123"></i></span>
                        <input type="text" name="cantidad" class="form-control" v-model="ventas[0].cantidad"
                            placeholder="Cantidad" disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="precio">Precio</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                        <input type="text" class="form-control" v-model="ventas[0].precio" placeholder="Precio"
                            disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="IVA">IVA</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-percent"></i></span>
                        <input type="text" class="form-control" v-model="ventas[0].IVA" placeholder="IVA" disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="subtotal">Subtotal</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-calculator"></i></span>
                        <input type="text" class="form-control" v-model="ventas[0].subtotal" placeholder="Subtotal"
                            disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="total">Total</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-cash-stack"></i></span>
                        <input type="text" class="form-control" v-model="ventas[0].total" placeholder="Total" disabled>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="fecha_venta">Fecha Venta</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-calendar"></i></span>
                        <input type="text" class="form-control" v-model="ventas[0].fecha_venta"
                            placeholder="Fecha Venta" disabled>
                    </div>
                </div>

                <div class="mb-3 text-center">
                    <button class="btn btn-danger" @click="deleteVenta(ventas[0])">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.border-custom {
    border: 3px solid #ff0000;
    border-radius: 20px;
    background-color: #ffcdd2;
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