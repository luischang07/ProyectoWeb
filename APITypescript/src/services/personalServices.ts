import { Personal,PersonalNuevo } from '../types/typePersonal';
import { conexion } from '../config/bd';
import { personaSchema } from '../schemas/persona.Schema';

export const getPersonalOne = async (id:number)=>{
    try {
        const [results] = await conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1',id);

        if(Array.isArray(results) && results.length > 0){
            return results;
        }else{ return {mensaje:`No existe el personal ${id}`}}

    } catch (err) {
        console.log(err);
        return {error:"No se puede obtener el personal"}
    } 
}

export const getPersonal = async ()=>{
    try {
        const [results] = await conexion.query('SELECT * FROM personal');

        if (Array.isArray(results) && results.length > 0) {
            return results;
        }else{ return {mensaje:"No hay personal para mostrar"}}

    } catch (err) {
        console.log(err);
        return {error:"No se puede obtener el personal"}
    } 
}

export const createPersonal = async (nuevo:PersonalNuevo)=>{    
    try {
        const validacion = personaSchema.safeParse(nuevo);
        if (!validacion.success) {
            return {error:validacion.error}
        }

        const [results] = await conexion.query('INSERT INTO personal(nombre,direccion,telefono,estatus) VALUES(?,?,?,?)',[nuevo.nombre,nuevo.direccion,nuevo.telefono,nuevo.estatus]);
        return results
    } catch (err) {
        console.log(err);
        return {error:"No se puede crear el personal"}
    } 
}

export const updatePersonal = async (modificado:Personal)=>{
    try {
        const validacion = personaSchema.safeParse(modificado);
        if (!validacion.success) {
            return {error:validacion.error}
        }
        const [results] = await conexion.query('UPDATE personal SET nombre = ?, direccion = ?, telefono = ?, estatus = ? WHERE id = ?',[modificado.nombre,modificado.direccion,modificado.telefono,modificado.estatus,modificado.id]);
        const result = results as unknown as {affectedRows:Personal};
        
        if (!result.affectedRows) {
            return {error:'No existe la persona que intentas actualizar'}
        }
        return results
    } catch (err) {
        console.log(err);
        return {error:"No se puede actualizar el personal"}
    } 
}

export const deletePersonal = async (id:number)=>{
    try {        
        const [results] = await conexion.query('DELETE FROM personal WHERE id = ?',[id]);

        const result = results as unknown as { affectedRows: number };
        if (result.affectedRows == 0) {
            return {error:"No existe el personal"}
        }
        return {mensaje:"Personal eliminado"}
    } catch (err) {
        console.log(err);
        return {error:"No se puede eliminar el personal"}
    } 
}

export const getPersonalTelefono = async (telefono:string)=>{
    try {
        const [results] = await conexion.query('SELECT * FROM personal WHERE telefono = ? AND estatus = 1',telefono);

        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else{return {error:"No existe personal con ese numero"}}

    } catch (err) {
        console.log(err);
        return {error:"No se puede obtener el personal"}
    }
}