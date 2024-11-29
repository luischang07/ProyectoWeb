import { Personal, PersonalNuevo } from '../types/typePersonal';
import { conexion } from '../config/bd';
import { personaSchema } from '../schemas/persona.Schema';
import { Request } from 'express';

export const getPersonalOne = async (id: number) => {
    try {
        const identificador = { id: id };
        const validacion = personaSchema.safeParse(identificador);
        if (!validacion.success)
            return { error: validacion.error }

        const [results] = await conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1', id);

        return results;
    } catch (err) {
        console.log(err);
        return { error: "No se puede obtener el personal" }
    }
}

export const getPersonalAll = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM personal');
        return results;
    } catch (err) {
        console.log(err);
        return { error: "No se puede obtener el personal" }
    }
}

export const getPersonal = async (req: Request) => {
    try {
        const { page = 1, limit = 12, filterField, filterValue } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Construir la consulta con los filtros
        let query = 'SELECT * FROM personal';
        const params: any[] = [];

        if (filterField && filterValue) {
            query += ` WHERE ?? LIKE ?`;
            params.push(filterField, `%${filterValue}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        params.push(Number(limit), offset);

        // Ejecutar la consulta
        const [results] = await conexion.query(query, params);

        // Obtener el total de registros para la paginación
        const [countResult] = await conexion.query(
            `SELECT COUNT(*) as total FROM personal ${filterField && filterValue ? 'WHERE ?? LIKE ?' : ''}`,
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
            return { mensaje: 'No hay personal para mostrar', data: [], pagination: { totalItems: 0 } };
        }
    } catch (err) {
        console.error(err);
        throw new Error('No se puede obtener el personal');
    }
};


export const createPersonal = async (nuevo: PersonalNuevo) => {
    try {
        const validacion = personaSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error }
        }

        const [results] = await
            conexion.query('INSERT INTO personal(nombre,direccion,telefono,estatus)' +
                'VALUES(?,?,?,?)', [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.estatus]);
        return results
    } catch (err) {
        console.log(err);
        return { error: "No se puede crear el personal" }
    }
}

export const updatePersonal = async (modificado: Personal) => {
    try {
        const validacion = personaSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query('UPDATE personal SET ' +
            'nombre = ?, direccion = ?, telefono = ?, estatus = ? WHERE id = ?',
            [modificado.nombre, modificado.direccion, modificado.telefono, modificado.estatus, modificado.id]);
        const result = results as unknown as { affectedRows: Personal };

        if (!result.affectedRows) {
            return { error: 'No existe la persona que intentas actualizar' }
        }
        return results
    } catch (err) {
        console.log(err);
        return { error: "No se puede actualizar el personal" }
    }
}

export const deletePersonal = async (id: number) => {
    try {
        const identificador = { id: id };
        const validacion = personaSchema.safeParse(identificador);
        if (!validacion.success)
            return { error: validacion.error }

        const [results] = await conexion.query('DELETE FROM personal WHERE id = ?', [id]);

        const result = results as unknown as { affectedRows: number };
        if (result.affectedRows == 0) {
            return { error: "No existe el personal" }
        }
        return { mensaje: "Personal eliminado" }
    } catch (err) {
        console.log(err);
        return { error: "No se puede eliminar el personal" }
    }
}

export const getPersonalTelefono = async (telefono: string) => {
    try {
        const tel = { telefono: telefono };
        const validacion = personaSchema.safeParse(tel);
        if (!validacion.success)
            return { error: validacion.error }

        const [results] = await conexion.query('SELECT * FROM personal WHERE telefono = ? AND estatus = 1', telefono);

        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else { return { error: "No existe personal con ese numero" } }

    } catch (err) {
        console.log(err);
        return { error: "No se puede obtener el personal" }
    }
}