import { Articulo, ArticuloNuevo } from "../types/typeArticulos";
import { Request } from "express";
import { conexion } from "../config/bd";
import { ArticuloSchema } from "../schemas/articulo.Schema";



export const getArticuloOne = async (id:number)=>{
    try {
        const [rawResults] = await conexion.query('SELECT * FROM articulos WHERE id = ? LIMIT 1',id);

        const results = Array.isArray(rawResults) ? rawResults.map(row => ({
            ...row,
            fecha_caducidad: new Date((row as any).fecha_caducidad).toISOString().split('T')[0]
        })) : rawResults;

        if(Array.isArray(results) && results.length > 0){
            return results;
        }else{ return {mensaje:`No existe el articulo ${id}`}}

    } catch (err) {
        return {error:"No se puede obtener el articulo"}
    } 
}

export const getArticulos = async (req: Request) => {
    try {
        const { page = 1, limit = 12, filterField, filterValue } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Construir la consulta con los filtros
        let query = 'SELECT * FROM articulos';
        const params: any[] = [];

        if (filterField && filterValue) {
            query += ` WHERE ?? LIKE ?`;
            params.push(filterField, `%${filterValue}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        params.push(Number(limit), offset);

        // Ejecutar la consulta
        const [rawResults] = await conexion.query(query, params);
        const results = Array.isArray(rawResults) ? rawResults.map(row => ({
            ...row,
            fecha_caducidad: new Date((row as any).fecha_caducidad).toISOString().split('T')[0]
        })) : rawResults;

        // Obtener el total de registros para la paginación
        const [countResult] = await conexion.query(
            `SELECT COUNT(*) as total FROM articulos ${filterField && filterValue ? 'WHERE ?? LIKE ?' : ''}`,
            filterField && filterValue ? [filterField, `%${filterValue}%`] : []
        );

        const total = Array.isArray(countResult) ? (countResult[0] as any).total : 0;
        const totalPages = Math.ceil(total / Number(limit));

        if (Array.isArray(results) && results.length > 0) {
            return {
                data: results,
                pagination: {
                    currentPage: Number(page),
                    totalPages,
                    totalItems: total,
                },
            };
        } else {
            return { mensaje: 'No hay articulos para mostrar', data: [], pagination: { totalItems: 0 } };
        }
    } catch (err) {
        return { error: 'No se pueden obtener los articulos' };
    }
};

export const createArticulo = async (nuevo:ArticuloNuevo)=>{
    try {
        nuevo.fecha_caducidad = new Date(nuevo.fecha_caducidad); // se convierte la fecha a objeto Date aa-mm-dd 
        const validacion = ArticuloSchema.safeParse(nuevo);
        if (!validacion.success) {
            return {error:validacion.error}
        }
        const [results] = await conexion.query('INSERT INTO articulos(descripcion,precio,cantidad_en_almacen,fecha_caducidad) VALUES(?,?,?,?)',[nuevo.descripcion,nuevo.precio,nuevo.cantidad_en_almacen,nuevo.fecha_caducidad]);
        return results
    } catch (err) {
        return {error:"No se puede crear el cliente"}
    } 
};

export const updateArticulo = async (modificado:Articulo)=>{
    try {
        modificado.fecha_caducidad = new Date(modificado.fecha_caducidad); // se convierte la fecha a objeto Date aa-mm-dd
        const validacion = ArticuloSchema.safeParse(modificado);
        if (!validacion.success) {
            return {error:validacion.error}
        }
        const [results] = await conexion.query('UPDATE articulos SET descripcion = ?, precio = ?, cantidad_en_almacen = ?, fecha_caducidad = ? WHERE id = ?',[modificado.descripcion,modificado.precio,modificado.cantidad_en_almacen,modificado.fecha_caducidad,modificado.id]);
        return results
    } catch (err) {
        return {error:"No se puede actualizar el articulo"}
    } 
};

export const deleteArticulo = async (id:number)=>{
    try {
        const [results] = await conexion.query('DELETE FROM articulos WHERE id = ? LIMIT 1',id);
        return results
    } catch (err) {
        return {error:"No se puede eliminar el articulo"}
    } 
};
