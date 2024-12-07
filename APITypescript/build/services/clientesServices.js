"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClienteByTelefono = exports.getClienteByCorreo = exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClientes = exports.getClientesSinPaginar = exports.getClienteOne = void 0;
const bd_1 = require("../config/bd");
const cliente_Schema_1 = require("../schemas/cliente.Schema");
const getClienteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM clientes WHERE id = ? LIMIT 1', id);
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: `No existe el cliente ${id}` };
        }
    }
    catch (err) {
        return { error: "No se puede obtener el cliente" };
    }
});
exports.getClienteOne = getClienteOne;
const getClientesSinPaginar = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM clientes');
        console.log(results);
        return results;
    }
    catch (err) {
        console.error(err);
        return { error: "No se puede obtener los clientes" };
    }
});
exports.getClientesSinPaginar = getClientesSinPaginar;
const getClientes = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 12, filterField, filterValue } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        // Construir la consulta con los filtros
        let query = 'SELECT * FROM clientes';
        const params = [];
        if (filterField && filterValue) {
            query += ` WHERE ?? LIKE ?`;
            params.push(filterField, `%${filterValue}%`);
        }
        query += ' LIMIT ? OFFSET ?';
        params.push(Number(limit), offset);
        // Ejecutar la consulta
        const [results] = yield bd_1.conexion.query(query, params);
        // Obtener el total de registros para la paginación
        const [countResult] = yield bd_1.conexion.query(`SELECT COUNT(*) as total FROM clientes ${filterField && filterValue ? 'WHERE ?? LIKE ?' : ''}`, filterField && filterValue ? [filterField, `%${filterValue}%`] : []);
        const total = Array.isArray(countResult) ? countResult[0].total : 0;
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
        }
        else {
            return { mensaje: 'No hay clientes para mostrar', data: [], pagination: { totalItems: 0 } };
        }
    }
    catch (err) {
        console.error(err);
        throw new Error('No se puede obtener los clientes');
    }
});
exports.getClientes = getClientes;
const createCliente = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validacion = cliente_Schema_1.ClienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = yield bd_1.conexion.query('INSERT INTO clientes(nombre,direccion,telefono,correo_electronico,ciudad) VALUES(?,?,?,?,?)', [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.correo_electronico, nuevo.ciudad]);
        return results;
    }
    catch (err) {
        return { error: "No se puede crear el cliente" };
    }
});
exports.createCliente = createCliente;
const updateCliente = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validacion = cliente_Schema_1.ClienteSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = yield bd_1.conexion.query('UPDATE clientes SET nombre = ?, direccion = ?, telefono = ?, correo_electronico = ?, ciudad = ? WHERE id = ?', [modificado.nombre, modificado.direccion, modificado.telefono, modificado.correo_electronico, modificado.ciudad, modificado.id]);
        const result = results;
        if (!result.affectedRows) {
            return { error: 'No existe el cliente que intentas actualizar' };
        }
        return results;
    }
    catch (err) {
        return { error: "No se puede actualizar el cliente" };
    }
});
exports.updateCliente = updateCliente;
const deleteCliente = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('DELETE FROM clientes WHERE id = ? LIMIT 1', id);
        const result = results;
        if (!result.affectedRows) {
            return { error: 'No existe el cliente que intentas eliminar' };
        }
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar el cliente" };
    }
});
exports.deleteCliente = deleteCliente;
const getClienteByCorreo = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM clientes WHERE correo = ? LIMIT 1', correo);
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: `No existe el cliente con correo ${correo}` };
        }
    }
    catch (err) {
        return { error: "No se puede obtener el cliente" };
    }
});
exports.getClienteByCorreo = getClienteByCorreo;
const getClienteByTelefono = (telefono) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM clientes WHERE telefono = ? LIMIT 1', telefono);
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: `No existe el cliente con telefono ${telefono}` };
        }
    }
    catch (err) {
        return { error: "No se puede obtener el cliente" };
    }
});
exports.getClienteByTelefono = getClienteByTelefono;
