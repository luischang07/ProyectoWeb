import {  Compras, ComprasNuevo } from "../types/typeCompras";
import {conexion} from "../config/bd";
import {  comprasNuevoSchema } from "../schemas/compras.Schema";
import { Request } from 'express';

export const getCompras = async (req: Request) => {
    try {
        const { page = 1, limit = 12, filterField, filterValue } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        let query = 'SELECT * FROM compras';
        const params: any[] = [];

        if (filterField && filterValue) {
            query += ` WHERE ?? LIKE ?`;
            params.push(filterField, `%${filterValue}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        params.push(Number(limit), offset);

        const [rawResults] = await conexion.query(query, params);
        const results = Array.isArray(rawResults) ? rawResults.map(row => ({
            ...row,
            fecha_compra: new Date((row as any).fecha_compra).toISOString().split('T')[0]
        })) : rawResults;

        const [countResult] = await conexion.query(
            `SELECT COUNT(*) as total FROM compras ${filterField && filterValue ? 'WHERE ?? LIKE ?' : ''}`,
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
            return { mensaje: 'No hay compras para mostrar', data: [], pagination: { totalItems: 0 } };
        }
    } catch (error) {
        console.error(error);
        throw new Error('No se puede obtener las compras');
    }
};

export const getCompraSinPaginacion = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM compras');
        return results;
    } catch (error) {
        throw new Error('No se puede obtener las compras');
    }
};

export const getCompraById = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM compras WHERE id = ?', [id]);
        if (Array.isArray(results) && results.length > 0) {
            return results;
        } else {
            return { mensaje: 'No existe compra con esa id' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('No se puede obtener la compra');
    }
};

export const createCompra = async (compra: ComprasNuevo) => {

    try {
        compra.fecha_compra = new Date(compra.fecha_compra);
        const validacion = comprasNuevoSchema.safeParse(compra);
        if (!validacion.success) {
            return { error: validacion.error };
        }

        const [results] = await conexion.query('INSERT INTO compras (id_articulo, cantidad, precio, IVA, subtotal, total, fecha_compra) VALUES (?, ?, ?, ?, ?, ?, ?)', [compra.id_articulo, compra.cantidad, compra.precio, compra.IVA, compra.subtotal, compra.total, compra.fecha_compra]);
        if (results) {
            await conexion.query('UPDATE articulos SET cantidad_en_almacen = cantidad_en_almacen + ? WHERE id = ?', [compra.cantidad, compra.id_articulo]);
        }
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('No se puede insertar la compra');
    }
}

export const updateCompra = async (compra: Compras) => {
    try {
        compra.fecha_compra = new Date(compra.fecha_compra);
        const [results] = await conexion.query('UPDATE compras SET id_articulo = ?, cantidad = ?, precio = ?, IVA = ?,subtotal = ?, fecha_compra = ? WHERE id = ?', [compra.id_articulo, compra.cantidad, compra.precio, compra.IVA, compra.subtotal, compra.fecha_compra, compra.id]);
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('No se puede actualizar la compra');
    }
};
export const deleteCompra = async (id: number) => {
    try {
        const [results] = await conexion.query('DELETE FROM compras WHERE id = ?', [id]);
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('No se puede eliminar la compra');
    }
};
