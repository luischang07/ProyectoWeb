import { Ventas, VentasNuevo } from '../types/typeVentas';
import { conexion } from '../config/bd';
import { ventasSchema } from '../schemas/ventas.Schema';

export const getVentasOne = async (id: number) => {
    try {
        const [rawResults] = await conexion.query('SELECT * FROM ventas WHERE id = ? LIMIT 1', id);

        const results = Array.isArray(rawResults) ? rawResults.map(row => ({
            ...row,
            fecha_venta: new Date((row as any).fecha_venta).toISOString().split('T')[0]
        })) : rawResults;

        if (Array.isArray(results) && results.length > 0) {
            return results;
        } else { return { mensaje: `No existe el articulo ${id}` } }

    } catch (err) {
        console.log(err);
        return { error: "No se puede obtener la venta" }
    }
}

export const getVentas = async (page: number = 1, limit: number = 12, filterField?: string, filterValue: string = '') => {
    try {
        console.log(page, limit, filterField, filterValue);
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM ventas';
        const params: any[] = [];

        if (filterField && filterValue) {
            query += ` WHERE ?? LIKE ?`;
            params.push(filterField, `%${filterValue}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [results] = await conexion.query(query, params);
        console.log(results);

        const [countResult] = await conexion.query(
            `SELECT COUNT(*) as total FROM ventas ${filterField && filterValue ? 'WHERE ?? LIKE ?' : ''}`,
            filterField && filterValue ? [filterField, `%${filterValue}%`] : []
        );

        const total = Array.isArray(countResult) ? (countResult[0] as any).total : 0;
        const totalPages = Math.ceil(total / limit);

        if (Array.isArray(results) && results.length > 0) {
            return {
                data: results,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: total,
                },
            };
        } else {
            return { mensaje: 'No hay ventas para mostrar', data: [], pagination: { totalItems: 0 } };
        }
    } catch (err) {
        return { error: "No se puede obtener las ventas" };
    }
};

export const getVentasAll = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM ventas');
        return results;
    } catch (err) {
        return { error: "No se puede obtener las ventas" }
    }
}

export const createVentas = async (nuevo: VentasNuevo) => {
    try {
        const validacion = ventasSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error }
        }

        const [results] = await
            conexion.query('INSERT INTO ventas(id_articulo, id_cliente, cantidad, precio, IVA, subtotal, total, fecha_venta)' +
                'VALUES(?,?,?,?,?,?,?,NOW())', [nuevo.id_articulo, nuevo.id_cliente, nuevo.cantidad, nuevo.precio, nuevo.IVA, nuevo.subtotal, nuevo.total]);
        console.log(results);
        return results
    } catch (err) {
        return { error: "No se puede crear la venta" }
    }
}

export const updateVentas = async (modificado: Ventas) => {
    try {
        const validacion = ventasSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query('UPDATE ventas SET ' +
            'id_articulo = ?, id_cliente = ?, cantidad = ?, precio = ?, IVA = ?, subtotal = ?, total = ?, fecha_venta = NOW() WHERE id = ?',
            [modificado.id_articulo, modificado.id_cliente, modificado.cantidad, modificado.precio, modificado.IVA, modificado.subtotal, modificado.total, modificado.id]);
        const result = results as unknown as { affectedRows: Ventas };

        if (!result.affectedRows) {
            return { error: 'No existe la venta que intentas actualizar' }
        }
        return results
    } catch (err) {
        return { error: "No se puede actualizar la venta" }
    }
}

export const deleteVentas = async (id: number) => {
    try {

        const [results] = await conexion.query('DELETE FROM ventas WHERE id = ?', [id]);

        const result = results as unknown as { affectedRows: number };
        if (result.affectedRows == 0) {
            return { error: "No existe la venta" }
        }
        return { mensaje: "Venta eliminada" }
    } catch (err) {
        return { error: "No se puede eliminar la venta" }
    }
}