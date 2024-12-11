import { ref } from "vue"
import type { Venta, VentaAgregar } from "../interfaces/ventas-interface";
import { ventasAPI } from "../api/VentasApi";

export const useVentas = () => {
    const ventas = ref<Venta[]>([]);
    let mensaje = ref<string[]>([]);

    const getVentas = async (params: Record<string, any> = {}) => {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = `/${queryParams ? '?' + queryParams : ''}`;
            const response = await ventasAPI.get<{ data: Venta[], pagination: any }>(url);
            ventas.value = response.data.data;
            console.log(response.data.data, response.data.pagination);
            return response.data;
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    const setVenta = async (venta: VentaAgregar) => {
        try {
            console.log(venta);
            const response = await ventasAPI.post('/', venta)

            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                mensaje.value = ['Venta agregada con éxito'];
            }

        } catch (error) {
            console.log(error);
            mensaje.value = ['Error al intentar agregar venta'];
        }
    }

    const getVentaById = async (id: number) => {
        try {
            const response = await ventasAPI.get<Venta[]>(`/${id}`)
            ventas.value = response.data;
            console.log(response.data);
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const updateVenta = async (venta: Venta) => {
        try {
            const response = await ventasAPI.put(`/`, venta)

            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else { mensaje.value = ['Venta actualizada con éxito']; }

        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }

    }

    const deleteVenta = async (venta: Venta) => {
        try {
            const response = await ventasAPI.delete('/', { data: { id: venta.id } })

            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else { mensaje.value = ['Venta eliminada']; }

        } catch (error) {
            console.log(error);
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }

    }

    return {
        ventas,
        mensaje,
        getVentas,
        getVentaById,
        setVenta,
        updateVenta,
        deleteVenta
    }
}
