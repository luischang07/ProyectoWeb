"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articulosController_1 = require("../controller/articulosController");
const router = express_1.default.Router();
router.get('/', articulosController_1.obtenerArticulos);
router.get('/getArticulos', articulosController_1.obtenerArticulosSinPaginar); // GET http://localhost:3001/api/articulos
router.get('/:id', articulosController_1.obtenerUnArticulo); // GET http://localhost:3001/api/articulos/1
router.post('/', articulosController_1.insertarArticulo);
router.put('/', articulosController_1.actualizarArticulo);
router.delete('/', articulosController_1.eliminarArticulo);
exports.default = router;
