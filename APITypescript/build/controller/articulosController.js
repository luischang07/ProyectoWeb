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
exports.obtenerArticulosSinPaginar = exports.eliminarArticulo = exports.actualizarArticulo = exports.insertarArticulo = exports.obtenerUnArticulo = exports.obtenerArticulos = void 0;
const articulosServices = __importStar(require("../services/articulosServices"));
const obtenerArticulos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articulos = yield articulosServices.getArticulos(req);
        res.json(articulos);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede obtener los articulos' });
    }
});
exports.obtenerArticulos = obtenerArticulos;
const obtenerUnArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const articulo = yield articulosServices.getArticuloOne(Number(id));
        res.json(articulo);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede obtener el articulo' });
    }
});
exports.obtenerUnArticulo = obtenerUnArticulo;
const insertarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { descripcion, precio, cantidad_en_almacen, fecha_caducidad } = req.body;
        const nuevoArticulo = yield articulosServices.createArticulo({ descripcion, precio, cantidad_en_almacen, fecha_caducidad });
        res.json(nuevoArticulo);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede crear el articulo' });
    }
});
exports.insertarArticulo = insertarArticulo;
const actualizarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, descripcion, precio, cantidad_en_almacen } = req.body;
        let { fecha_caducidad } = req.body;
        fecha_caducidad = new Date(fecha_caducidad);
        const articuloModificado = yield articulosServices.updateArticulo({ id, descripcion, precio, cantidad_en_almacen, fecha_caducidad });
        res.json(articuloModificado);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede actualizar el articulo' });
    }
});
exports.actualizarArticulo = actualizarArticulo;
const eliminarArticulo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const articuloEliminado = yield articulosServices.deleteArticulo(id);
        res.json(articuloEliminado);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede eliminar el articulo' });
    }
});
exports.eliminarArticulo = eliminarArticulo;
const obtenerArticulosSinPaginar = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articulos = yield articulosServices.getAllArticulos();
        res.json(articulos);
    }
    catch (err) {
        res.status(500).send({ error: 'No se puede obtener los articulos desde controller' });
    }
});
exports.obtenerArticulosSinPaginar = obtenerArticulosSinPaginar;
