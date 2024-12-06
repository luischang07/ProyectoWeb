import { ref } from 'vue';
import type { Articulos, ArticulosAgregar } from '../interfaces/articulos-interface';
import { articulosAPI } from '../api/articulosAPI';

export const useArticulos = () => {
    const articulos = ref<Articulos[]>([]);
    let mensaje = ref<string[]>([]);

    const getArticulos = async (params: Record<string, any> = {}) => {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = `/${queryParams ? '?' + queryParams : ''}`;
            const response = await articulosAPI.get<{ data: Articulos[], pagination: any }>(url);
            articulos.value = response.data.data;
            return response.data;
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    const getAllArticulos = async () => {
        try {
            const response = await articulosAPI.get<Articulos[]>(`/getArticulos`)
            articulos.value = response.data;
            console.log(response.data);
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const setArticulos = async (articulos: ArticulosAgregar) => {
        try {
            const response = await articulosAPI.post('/', articulos)

            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                mensaje.value = ['Articulo agregado con éxito'];
            }

        } catch (error) {
            mensaje.value = ['Error al intentar agregar articulos'];
        }
    }

    const getArticulosById = async (id: number) => {
        try {
            const response = await articulosAPI.get<Articulos[]>(`/${id}`)
            articulos.value = response.data;
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const updateArticulos = async (articulos: Articulos) => {
        try {
            const response = await articulosAPI.put(`/`, articulos)
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                mensaje.value = ['Articulo actualizado con éxito'];
            }
        } catch (error) {
            mensaje.value = ['Error al intentar actualizar articulos'];
        }
    }

    const deleteArticulos = async (articulos: Articulos) => {
        try {
            const response = await articulosAPI.delete('/', { data: { id: articulos.id } })
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                mensaje.value = ['Articulos eliminado con éxito'];
            }
        } catch (error) {
            mensaje.value = ['Error al intentar eliminar articulos'];
        }
    }

    return {
        articulos,
        mensaje,
        getArticulos,
        setArticulos,
        getArticulosById,
        updateArticulos,
        deleteArticulos,
        getAllArticulos
    }
    
}