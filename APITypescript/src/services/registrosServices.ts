import { Registros } from "../types/typeRegistros"
import { registroSchema } from "../schemas/registro.Schema"
import { conexion } from "../config/bd"



export const getRegistros = async ()=>{
    try{
        const [results] = await conexion.query('SELECT * FROM registros');
        return results;
    }catch(err){
        return {error: "No se puede obtener los registros"}
    }
}

export const createRegistro = async (registro: Registros)=>{
    try{
        registro.fecha = new Date(registro.fecha);
        const validacion = registroSchema.safeParse(registro);
        if (!validacion.success)
            return { error: validacion.error }

        const [results] = await conexion.query('INSERT INTO registro(id_personal,fecha,hora,movimiento) VALUES(?,?,?,?)', [registro.id_personal,registro.fecha,registro.hora,registro.movimiento]);
        return results;
    }catch(err){
        return {error: "No se puede insertar el registro"}
    }
}

export const deleteRegistro = async (id: number)=>{
    try{
        const [existingRecord] = await conexion.query('SELECT * FROM registro WHERE id = ?', [id]);
        
        if (!existingRecord || (Array.isArray(existingRecord) && existingRecord.length === 0)) {
            return{ error: "No existe un registro con esa ID" };
        }
        const [results] = await conexion.query('DELETE FROM registro WHERE id = ?', [id]);
        return results;
    }catch(err){
        return {error: "No se puede borrar el registro"}
    }
};