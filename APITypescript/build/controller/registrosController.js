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
exports.borrarRegistro = exports.insertarRegistro = exports.obtenerRegistros = void 0;
const registrosServices_1 = require("../services/registrosServices");
const obtenerRegistros = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registros = yield (0, registrosServices_1.getRegistros)();
        res.json(registros);
    }
    catch (error) {
        res.status(500).json({ error: 'No se pudieron obtener los registros' });
    }
});
exports.obtenerRegistros = obtenerRegistros;
const insertarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_personal, movimiento } = req.body;
        const fecha = new Date().toLocaleDateString('en-US');
        const hora = new Date().toLocaleTimeString('en-US', { hour12: false });
        console.group(fecha + " ---- " + hora);
        const registro = { id_personal, fecha, hora, movimiento };
        const resultado = yield (0, registrosServices_1.createRegistro)(registro);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: 'No se pudo insertar el registro' });
    }
});
exports.insertarRegistro = insertarRegistro;
const borrarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultado = yield (0, registrosServices_1.deleteRegistro)(parseInt(id));
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ error: 'No se pudo borrar el registro' });
    }
});
exports.borrarRegistro = borrarRegistro;
