import { ref } from "vue"
import type { Personal, PersonalAgregar } from "../interfaces/personal-interface";
import { personalAPI } from "../api/personalAPI";
/**
 * Hook personalizado para manejar operaciones CRUD de personal
 * @returns Objeto con variables reactivas y funciones para gestionar el personal
 * @property {Ref<Personal[]>} personal - Array reactivo que contiene la lista de personal
 * @property {Ref<string[]>} mensaje - Array reactivo que contiene mensajes de respuesta
 * @property {Function} getPersonal - Obtiene la lista completa del personal
 * @property {Function} setPersonal - Agrega un nuevo personal
 * @property {Function} updatePersonal - Actualiza los datos de un personal existente
 * @property {Function} getPersonalById - Obtiene un personal específico por su ID
 * */
export const usePersonal = () => {
    const personal = ref<Personal[]>([]); // inicializando el personal con ref para mostrarlo en la vista
    let mensaje = ref<string[]>([]); // inicializando mensaje con ref para mostrarlo en la vista

    const getPersonal = async () => {
        try {
            const response = await personalAPI.get<Personal[]>('') 
            personal.value = response.data; 
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }; 

    const setPersonal = async (personal:PersonalAgregar) => {
        try {
            const response = await personalAPI.post('/', personal)

            if (response.data.error) {
                let {error} = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                mensaje.value = ['Personal agregado con éxito'];
            }

        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const getPersonalById = async (id:number) => {
        try{
            const response = await personalAPI.get<Personal[]>(`/${id}`)
            personal.value= response.data;
        }catch(error){
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const updatePersonal = async (personal:Personal) => {
        try {
            const response = await personalAPI.put(`/`, personal)

            if (response.data.error) {
                let {error} = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message); 
            }else{mensaje.value = ['Personal actualizado con éxito'];}

        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }

    }

    const deletePersonal = async (personal:Personal) => {
        try {
            const response = await personalAPI.delete('/', {data:{id:personal.id}})

            if (response.data.error) {
                let {error} = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message); 
            }else{mensaje.value = ['Personal eliminado'];}

        }catch(error){
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }

    }

    return {
        personal,
        mensaje,
        getPersonal,
        getPersonalById,
        setPersonal,
        updatePersonal,
        deletePersonal
    }
}

