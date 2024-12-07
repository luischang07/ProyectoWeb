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
exports.deleteCompra = exports.updateCompra = exports.createCompra = exports.getCompraById = exports.getCompraSinPaginacion = exports.getCompras = void 0;
const bd_1 = require("../config/bd");
const compras_Schema_1 = require("../schemas/compras.Schema");
const getCompras = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 12, filterField, filterValue } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        let query = 'SELECT * FROM compras';
        const params = [];
        if (filterField && filterValue) {
            query += ` WHERE ?? LIKE ?`;
            params.push(filterField, `%${filterValue}%`);
        }
        query += ' LIMIT ? OFFSET ?';
        params.push(Number(limit), offset);
        const [rawResults] = yield bd_1.conexion.query(query, params);
        const results = Array.isArray(rawResults) ? rawResults.map(row => (Object.assign(Object.assign({}, row), { fecha_compra: new Date(row.fecha_compra).toISOString().split('T')[0] }))) : rawResults;
        const [countResult] = yield bd_1.conexion.query(`SELECT COUNT(*) as total FROM compras ${filterField && filterValue ? 'WHERE ?? LIKE ?' : ''}`, filterField && filterValue ? [filterField, `%${filterValue}%`] : []);
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
            return { mensaje: 'No hay compras para mostrar', data: [], pagination: { totalItems: 0 } };
        }
    }
    catch (error) {
        console.error(error);
        throw new Error('No se puede obtener las compras');
    }
});
exports.getCompras = getCompras;
const getCompraSinPaginacion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM compras');
        return results;
    }
    catch (error) {
        throw new Error('No se puede obtener las compras');
    }
});
exports.getCompraSinPaginacion = getCompraSinPaginacion;
const getCompraById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM compras WHERE id = ?', [id]);
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: 'No existe compra con esa id' };
        }
    }
    catch (error) {
        console.error(error);
        throw new Error('No se puede obtener la compra');
    }
});
exports.getCompraById = getCompraById;
const createCompra = (compra) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        compra.fecha_compra = new Date(compra.fecha_compra);
        const validacion = compras_Schema_1.comprasNuevoSchema.safeParse(compra);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = yield bd_1.conexion.query('INSERT INTO compras (id_articulo, cantidad, precio, IVA, subtotal, total, fecha_compra) VALUES (?, ?, ?, ?, ?, ?, ?)', [compra.id_articulo, compra.cantidad, compra.precio, compra.IVA, compra.subtotal, compra.total, compra.fecha_compra]);
        if (results) {
            yield bd_1.conexion.query('UPDATE articulos SET cantidad_en_almacen = cantidad_en_almacen + ? WHERE id = ?', [compra.cantidad, compra.id_articulo]);
        }
        return results;
    }
    catch (error) {
        console.error(error);
        throw new Error('No se puede insertar la compra');
    }
});
exports.createCompra = createCompra;
const updateCompra = (compra) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        compra.fecha_compra = new Date(compra.fecha_compra);
        const [results] = yield bd_1.conexion.query('UPDATE compras SET id_articulo = ?, cantidad = ?, precio = ?, IVA = ?,subtotal = ?, fecha_compra = ? WHERE id = ?', [compra.id_articulo, compra.cantidad, compra.precio, compra.IVA, compra.subtotal, compra.fecha_compra, compra.id]);
        return results;
    }
    catch (error) {
        console.error(error);
        throw new Error('No se puede actualizar la compra');
    }
});
exports.updateCompra = updateCompra;
const deleteCompra = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('DELETE FROM compras WHERE id = ?', [id]);
        return results;
    }
    catch (error) {
        console.error(error);
        throw new Error('No se puede eliminar la compra');
    }
});
exports.deleteCompra = deleteCompra;
