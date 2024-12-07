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
exports.eliminarCliente = exports.actualizarCliente = exports.insertarCliente = exports.getClientesSinPaginar = exports.obtenerUnCliente = exports.obtenerClientes = void 0;
const ClienteService = __importStar(require("../services/clientesServices"));
const obtenerClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let clientes = yield ClienteService.getClientes(req);
    res.json(clientes);
});
exports.obtenerClientes = obtenerClientes;
const obtenerUnCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = yield ClienteService.getClienteOne(Number(req.params.id));
    res.json(cliente);
});
exports.obtenerUnCliente = obtenerUnCliente;
const getClientesSinPaginar = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let clientes = yield ClienteService.getClientesSinPaginar();
    res.json(clientes);
});
exports.getClientesSinPaginar = getClientesSinPaginar;
const insertarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, direccion, telefono, correo_electronico, ciudad } = req.body;
        const nuevoCliente = yield ClienteService.createCliente({ nombre, direccion, telefono, correo_electronico, ciudad });
        res.json(nuevoCliente);
    }
    catch (error) {
        res.send({ error: "No se puede crear el cliente" });
    }
});
exports.insertarCliente = insertarCliente;
const actualizarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, direccion, telefono, correo_electronico, ciudad } = req.body;
        const clienteModificado = yield ClienteService.updateCliente({ id, nombre, direccion, telefono, correo_electronico, ciudad });
        res.json(clienteModificado);
    }
    catch (error) {
        res.send({ error: "No se puede actualizar el cliente" });
    }
});
exports.actualizarCliente = actualizarCliente;
const eliminarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const clienteEliminado = yield ClienteService.deleteCliente(id);
        res.json(clienteEliminado);
    }
    catch (error) {
        res.send({ error: "No se puede eliminar el cliente" });
    }
});
exports.eliminarCliente = eliminarCliente;
