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
exports.deleteArticulo = exports.updateArticulo = exports.createArticulo = exports.getAllArticulos = exports.getArticulos = exports.getArticuloOne = void 0;
const bd_1 = require("../config/bd");
const articulo_Schema_1 = require("../schemas/articulo.Schema");
const getArticuloOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rawResults] = yield bd_1.conexion.query('SELECT * FROM articulos WHERE id = ? LIMIT 1', id);
        const results = Array.isArray(rawResults) ? rawResults.map(row => (Object.assign(Object.assign({}, row), { fecha_caducidad: new Date(row.fecha_caducidad).toISOString().split('T')[0] }))) : rawResults;
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: `No existe el articulo ${id}` };
        }
    }
    catch (err) {
        return { error: "No se puede obtener el articulo" };
    }
});
exports.getArticuloOne = getArticuloOne;
const getArticulos = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 12, filterField, filterValue } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        // Construir la consulta con los filtros
        let query = 'SELECT * FROM articulos';
        const params = [];
        if (filterField && filterValue) {
            query += ` WHERE ?? LIKE ?`;
            params.push(filterField, `%${filterValue}%`);
        }
        query += ' LIMIT ? OFFSET ?';
        params.push(Number(limit), offset);
        // Ejecutar la consulta
        const [rawResults] = yield bd_1.conexion.query(query, params);
        const results = Array.isArray(rawResults) ? rawResults.map(row => (Object.assign(Object.assign({}, row), { fecha_caducidad: new Date(row.fecha_caducidad).toISOString().split('T')[0] }))) : rawResults;
        // Obtener el total de registros para la paginación
        const [countResult] = yield bd_1.conexion.query(`SELECT COUNT(*) as total FROM articulos ${filterField && filterValue ? 'WHERE ?? LIKE ?' : ''}`, filterField && filterValue ? [filterField, `%${filterValue}%`] : []);
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
            return { mensaje: 'No hay articulos para mostrar', data: [], pagination: { totalItems: 0 } };
        }
    }
    catch (err) {
        return { error: 'No se pueden obtener los articulos' };
    }
});
exports.getArticulos = getArticulos;
const getAllArticulos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rawResults] = yield bd_1.conexion.query('SELECT * FROM articulos');
        console.log(rawResults);
        const results = Array.isArray(rawResults) ? rawResults.map(row => (Object.assign(Object.assign({}, row), { fecha_caducidad: new Date(row.fecha_caducidad).toISOString().split('T')[0] }))) : rawResults;
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: 'No hay articulos para mostrar', data: [] };
        }
    }
    catch (err) {
        return { error: 'No se pueden obtener los articulos' };
    }
});
exports.getAllArticulos = getAllArticulos;
const createArticulo = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        nuevo.fecha_caducidad = new Date(nuevo.fecha_caducidad); // se convierte la fecha a objeto Date aa-mm-dd 
        const validacion = articulo_Schema_1.ArticuloSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = yield bd_1.conexion.query('INSERT INTO articulos(descripcion,precio,cantidad_en_almacen,fecha_caducidad) VALUES(?,?,?,?)', [nuevo.descripcion, nuevo.precio, nuevo.cantidad_en_almacen, nuevo.fecha_caducidad]);
        return results;
    }
    catch (err) {
        return { error: "No se puede crear el cliente" };
    }
});
exports.createArticulo = createArticulo;
const updateArticulo = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        modificado.fecha_caducidad = new Date(modificado.fecha_caducidad); // se convierte la fecha a objeto Date aa-mm-dd
        const validacion = articulo_Schema_1.ArticuloSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = yield bd_1.conexion.query('UPDATE articulos SET descripcion = ?, precio = ?, cantidad_en_almacen = ?, fecha_caducidad = ? WHERE id = ?', [modificado.descripcion, modificado.precio, modificado.cantidad_en_almacen, modificado.fecha_caducidad, modificado.id]);
        return results;
    }
    catch (err) {
        return { error: "No se puede actualizar el articulo" };
    }
});
exports.updateArticulo = updateArticulo;
const deleteArticulo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('DELETE FROM articulos WHERE id = ? LIMIT 1', id);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar el articulo" };
    }
});
exports.deleteArticulo = deleteArticulo;
