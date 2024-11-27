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
exports.getClienteByTelefono = exports.getClienteByCorreo = exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClientes = exports.getClienteOne = void 0;
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
const getClientes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM clientes');
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: "No hay clientes para mostrar" };
        }
    }
    catch (err) {
        return { error: "No se puede obtener el cliente" };
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
