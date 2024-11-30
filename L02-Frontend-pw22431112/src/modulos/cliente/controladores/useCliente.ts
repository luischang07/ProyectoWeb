import {ref} from 'vue';
import type {Cliente, ClienteAgregar} from '../interfaces/cliente-interface';
import {clienteAPI} from '../api/clienteAPI';


export const useCliente = () => {
    const clientes = ref<Cliente[]>([]); // inicializando los clientes con ref para mostrarlos en la vista
    let mensaje = ref<string[]>([]); // inicializando mensaje con ref para mostrarlo en la vista
    
    const getClientes = async (params: Record<string, any> = {}) => {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = `/${queryParams ? '?' + queryParams : ''}`;
            const response = await clienteAPI.get<{ data: Cliente[], pagination: any }>(url);
            clientes.value = response.data.data; // Ajustado para reflejar la respuesta del API
            return response.data; // Devolver la respuesta completa incluyendo paginación
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };
    

    const getClienteById = async (id:number) => {
        try{
            const response = await clienteAPI.get<Cliente[]>(`/${id}`)
            clientes.value= response.data;
        }catch(error){
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const setCliente = async (cliente:ClienteAgregar) => {
        try {
            const response = await clienteAPI.post('/', cliente)

            if (response.data.error) {
                let {error} = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                mensaje.value = ['Cliente agregado con éxito'];
            }

        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const updateCliente = async (cliente:Cliente) => {
        try {
            const response = await clienteAPI.put(`/`, cliente)
            if (response.data.error) {
                let {error} = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message); 
            }else{mensaje.value = ['Cliente actualizado con éxito'];}

        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }

    }

    const deleteCliente = async (cliente:Cliente) => {
        try {
            const response = await clienteAPI.delete('/', {data:{id:cliente.id}})
            if (response.data.error) {
                let {error} = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message); 
            }else{mensaje.value = ['Cliente eliminado con éxito'];}
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    
    return{
        clientes,
        mensaje,
        getClientes,
        getClienteById,
        updateCliente,
        setCliente,
        deleteCliente
    }
};

