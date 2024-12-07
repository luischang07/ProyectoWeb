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
exports.deleteRegistro = exports.createRegistro = exports.getRegistros = void 0;
const registro_Schema_1 = require("../schemas/registro.Schema");
const bd_1 = require("../config/bd");
const getRegistros = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield bd_1.conexion.query('SELECT * FROM registros');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener los registros" };
    }
});
exports.getRegistros = getRegistros;
const createRegistro = (registro) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        registro.fecha = new Date(registro.fecha);
        const validacion = registro_Schema_1.registroSchema.safeParse(registro);
        if (!validacion.success)
            return { error: validacion.error };
        const [results] = yield bd_1.conexion.query('INSERT INTO registro(id_personal,fecha,hora,movimiento) VALUES(?,?,?,?)', [registro.id_personal, registro.fecha, registro.hora, registro.movimiento]);
        return results;
    }
    catch (err) {
        return { error: "No se puede insertar el registro" };
    }
});
exports.createRegistro = createRegistro;
const deleteRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [existingRecord] = yield bd_1.conexion.query('SELECT * FROM registro WHERE id = ?', [id]);
        if (!existingRecord || (Array.isArray(existingRecord) && existingRecord.length === 0)) {
            return { error: "No existe un registro con esa ID" };
        }
        const [results] = yield bd_1.conexion.query('DELETE FROM registro WHERE id = ?', [id]);
        return results;
    }
    catch (err) {
        return { error: "No se puede borrar el registro" };
    }
});
exports.deleteRegistro = deleteRegistro;
