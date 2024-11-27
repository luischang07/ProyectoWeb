import { Cliente, ClienteNuevo } from "../types/typeClientes";
import { conexion } from "../config/bd";
import { ClienteSchema } from "../schemas/cliente.Schema";

export const getClienteOne = async (id:number)=>{
    try {
        const [results] = await conexion.query('SELECT * FROM clientes WHERE id = ? LIMIT 1',id);

        if(Array.isArray(results) && results.length > 0){
            return results;
        }else{ return {mensaje:`No existe el cliente ${id}`}}

    } catch (err) {
        return {error:"No se puede obtener el cliente"}
    } 
}

export const getClientes = async ()=>{
    try {
        const [results] = await conexion.query('SELECT * FROM clientes');

        if (Array.isArray(results) && results.length > 0) {
            return results;
        }else{ return {mensaje:"No hay clientes para mostrar"}}

    } catch (err) {
        return {error:"No se puede obtener el cliente"}
    } 
};

export const createCliente = async (nuevo:ClienteNuevo)=>{
    try {
        const validacion = ClienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return {error:validacion.error}
        }
        const [results] = await conexion.query('INSERT INTO clientes(nombre,direccion,telefono,correo_electronico,ciudad) VALUES(?,?,?,?,?)',[nuevo.nombre,nuevo.direccion,nuevo.telefono,nuevo.correo_electronico,nuevo.ciudad]);
        return results
    } catch (err) {
        return {error:"No se puede crear el cliente"}
    } 
};

export const updateCliente = async (modificado:Cliente)=>{
    try {
        const validacion = ClienteSchema.safeParse(modificado);
        if (!validacion.success) {
            return {error:validacion.error}
        }
        const [results] = await conexion.query('UPDATE clientes SET nombre = ?, direccion = ?, telefono = ?, correo_electronico = ?, ciudad = ? WHERE id = ?',[modificado.nombre,modificado.direccion,modificado.telefono,modificado.correo_electronico,modificado.ciudad,modificado.id]);
        const result = results as unknown as {affectedRows:Cliente};
        
        if (!result.affectedRows) {
            return {error:'No existe el cliente que intentas actualizar'}
        }
        return results
    } catch (err) {
        return {error:"No se puede actualizar el cliente"}
    } 
};

export const deleteCliente = async (id:number)=>{
    try {
        const [results] = await conexion.query('DELETE FROM clientes WHERE id = ? LIMIT 1',id);
        const result = results as unknown as {affectedRows:number};

        if (!result.affectedRows) {
            return {error:'No existe el cliente que intentas eliminar'}
        }
        return results
    } catch (err) {
        return {error:"No se puede eliminar el cliente"}
    }
};

export const getClienteByCorreo = async (correo:string)=>{
    try {
        const [results] = await conexion.query('SELECT * FROM clientes WHERE correo = ? LIMIT 1',correo);

        if(Array.isArray(results) && results.length > 0){
            return results;
        }else{ return {mensaje:`No existe el cliente con correo ${correo}`}}

    } catch (err) {
        return {error:"No se puede obtener el cliente"}
    } 
};

export const getClienteByTelefono = async (telefono:string)=>{
    try {
        const [results] = await conexion.query('SELECT * FROM clientes WHERE telefono = ? LIMIT 1',telefono);

        if(Array.isArray(results) && results.length > 0){
            return results;
        }else{ return {mensaje:`No existe el cliente con telefono ${telefono}`}}

    } catch (err) {
        return {error:"No se puede obtener el cliente"}
    } 
};