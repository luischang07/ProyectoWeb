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
exports.getPersonalTelefono = exports.deletePersonal = exports.updatePersonal = exports.createPersonal = exports.getPersonal = exports.getPersonalOne = void 0;
const bd_1 = require("../config/bd");
const persona_Schema_1 = require("../schemas/persona.Schema");
const getPersonalOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1', id);
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: `No existe el personal ${id}` };
        }
    }
    catch (err) {
        console.log(err);
        return { error: "No se puede obtener el personal" };
    }
});
exports.getPersonalOne = getPersonalOne;
const getPersonal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM personal');
        if (Array.isArray(results) && results.length > 0) {
            return results;
        }
        else {
            return { mensaje: "No hay personal para mostrar" };
        }
    }
    catch (err) {
        console.log(err);
        return { error: "No se puede obtener el personal" };
    }
});
exports.getPersonal = getPersonal;
const createPersonal = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validacion = persona_Schema_1.personaSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = yield bd_1.conexion.query('INSERT INTO personal(nombre,direccion,telefono,estatus) VALUES(?,?,?,?)', [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.estatus]);
        return results;
    }
    catch (err) {
        console.log(err);
        return { error: "No se puede crear el personal" };
    }
});
exports.createPersonal = createPersonal;
const updatePersonal = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('UPDATE personal SET nombre = ?, direccion = ?, telefono = ?, estatus = ? WHERE id = ?', [modificado.nombre, modificado.direccion, modificado.telefono, modificado.estatus, modificado.id]);
        return results;
    }
    catch (err) {
        console.log(err);
        return { error: "No se puede actualizar el personal" };
    }
});
exports.updatePersonal = updatePersonal;
const deletePersonal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('DELETE FROM personal WHERE id = ?', [id]);
        const result = results;
        if (result.affectedRows == 0) {
            return { error: "No existe el personal" };
        }
        return { mensaje: "Personal eliminado" };
    }
    catch (err) {
        console.log(err);
        return { error: "No se puede eliminar el personal" };
    }
});
exports.deletePersonal = deletePersonal;
const getPersonalTelefono = (telefono) => __awaiter(void 0, void 0, void 0, function* () {
    {
        try {
            const [results] = yield bd_1.conexion.query('SELECT * FROM personal WHERE telefono = ? AND estatus = 1', telefono);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            }
            else {
                return { error: "No existe personal con ese numero" };
            }
        }
        catch (err) {
            console.log(err);
            return { error: "No se puede obtener el personal" };
        }
    }
});
exports.getPersonalTelefono = getPersonalTelefono;
