import { ref } from "vue"
import type { Registro, RegistroAgregar } from "../interfaces/registros-interface";
import { registrosAPI } from "../api/registrosAPI";



export const useRegistros = () => {

    const registros = ref<Registro[]>([]);
    let mensaje = ref<string[]>([]);

    const getRegistros = async () => {
        try {
            const response = await registrosAPI.get<Registro[]>(`/`)
            registros.value = response.data;
            console.log(response.data);
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const setRegistro = async (registro: RegistroAgregar) => {
        try {
            const response = await registrosAPI.post('/', registro)

            if (response.data.error) {
                let { error } = response.data;
                console.log(error);
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            } else {
                mensaje.value = ['Registro agregado con éxito'];
            }

        } catch (error) {
            console.log(error);
            mensaje.value = ['Error al intentar agregar registro'];
        }
    }


    const deleteRegistro = async (id: number) => {
        try {
            const response = await registrosAPI.delete(`/${id}`);
            mensaje.value = ['Registro eliminado con éxito'];
        } catch (error) {
            mensaje.value = ['Error al intentar eliminar registro'];
        }
    }

    return {
        registros,
        mensaje,
        getRegistros,
        setRegistro,
        deleteRegistro
    }

}