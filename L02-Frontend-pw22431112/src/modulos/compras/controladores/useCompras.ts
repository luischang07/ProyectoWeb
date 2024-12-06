import {ref} from 'vue';
import type {Compra, CompraAgregar} from '../interfaces/compras-interface';
import {comprasAPI} from '../api/comprasAPI';


export const useCompras = () => {
    const compras = ref<Compra[]>([]); // inicializando los clientes con ref para mostrarlos en la vista
    let mensaje = ref<string[]>([]); // inicializando mensaje con ref para mostrarlo en la vista

    // Función para obtener las compras
    const getCompras = async (params:Record<string,any> = {} ) => {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = `/${queryParams ? '?' + queryParams : ''}`;
            const response = await comprasAPI.get<{ data: Compra[], pagination: any }>(url);
            compras.value = response.data.data; // Ajustado para reflejar la respuesta del API
            return response.data; // Devolver la respuesta completa incluyendo paginación
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    const getComprasById = async (id: number) => {
        try {
            const response = await comprasAPI.get<Compra[]>(`/${id}`)
            compras.value = response.data;
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const setCompras = async (compra: CompraAgregar) => {
        try {
            const response = await comprasAPI.post('/', compra);
            
            // Verificar si la respuesta contiene un error y manejarlo
            if (response.data.error) {
                let { error } = response.data;
                // Asegurarse de que 'issues' existe antes de intentar acceder
                if (error && error.issues) {
                    mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
                } else {
                    mensaje.value = ['Error desconocido al agregar la compra'];
                }
            } else {
                mensaje.value = ['Compra agregada con éxito'];
            }
        } catch (error) {
            // Si ocurre un error en la solicitud de la API
            mensaje.value = ['Error al intentar agregar la compra.'];
            console.error(error); // Para más detalles sobre el error
        }
    };
    
    const updateCompras = async (compra: Compra) => {
        try {
            const response = await comprasAPI.put(`/`, compra);
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            }else{
                mensaje.value = ['Compra actualizada con éxito'];
            }
        } catch (error) {
            mensaje.value = ['Error al intentar actualizar la compra.'];
            console.error(error);
        }
    };

    return {
        compras,
        mensaje,
        getCompras,
        getComprasById,
        setCompras,
        updateCompras
    };
};

