"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientesController_1 = require("../controller/clientesController");
const router = express_1.default.Router();
router.get('/', clientesController_1.obtenerClientes);
router.get('/getClientes', clientesController_1.getClientesSinPaginar);
router.get('/:id', clientesController_1.obtenerUnCliente);
router.post('/', clientesController_1.insertarCliente);
router.put('/', clientesController_1.actualizarCliente);
router.delete('/', clientesController_1.eliminarCliente);
exports.default = router;
