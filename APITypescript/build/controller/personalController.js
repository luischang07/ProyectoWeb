"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.eliminarPersonal = exports.modificarPersonal = exports.insertarPersonal = exports.obtenerPorTelefono = exports.obtenerUnPersonal = exports.obtenerPersonal = exports.obtenerPersonalSinPaginar = void 0;
const PersonalServices = __importStar(require("../services/personalServices"));
const obtenerPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personal = yield PersonalServices.getPersonal(req);
        res.json(personal);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede obtener el personal' });
    }
});
exports.obtenerPersonal = obtenerPersonal;
const obtenerPersonalSinPaginar = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personal = yield PersonalServices.getPersonalAll();
        res.json(personal);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede obtener el personal' });
    }
});
exports.obtenerPersonalSinPaginar = obtenerPersonalSinPaginar;
const obtenerUnPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let personal = yield PersonalServices.getPersonalOne(Number(req.params.id));
    res.json(personal);
});
exports.obtenerUnPersonal = obtenerUnPersonal;
const obtenerPorTelefono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let personalPorTelefono = yield PersonalServices.getPersonalTelefono(req.params.telefono);
    res.json(personalPorTelefono);
});
exports.obtenerPorTelefono = obtenerPorTelefono;
const insertarPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, direccion, telefono, estatus } = req.body;
        const nuevoPersonal = yield PersonalServices.createPersonal({ nombre, direccion, telefono, estatus });
        res.json(nuevoPersonal);
    }
    catch (error) {
        res.send({ error: "No se puede crear el personal" });
    }
});
exports.insertarPersonal = insertarPersonal;
const modificarPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, direccion, telefono, estatus } = req.body;
        const modificado = yield PersonalServices.updatePersonal({
            id,
            nombre,
            direccion,
            telefono,
            estatus
        });
        res.json(modificado);
    }
    catch (error) {
        res.json({ error: "No se puede actualizar el personal" });
    }
});
exports.modificarPersonal = modificarPersonal;
const eliminarPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const eliminado = yield PersonalServices.deletePersonal(Number(id));
        res.json(eliminado);
    }
    catch (error) {
        res.json({ error: "No se puede eliminar el personal" });
    }
});
exports.eliminarPersonal = eliminarPersonal;
