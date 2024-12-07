"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comprasController_1 = require("../controller/comprasController");
const router = express_1.default.Router();
router.get('/', comprasController_1.obtenerCompras); // GET http://localhost:3000/api/compras || compras paginadas
router.get('/getCompras', comprasController_1.obtenerCompraSinPaginacion); // GET http://localhost:3000/api/compras/compras || todas las compras sin paginar
router.get('/:id', comprasController_1.obtenerCompraPorId); // GET http://localhost:3000/api/compras/compras/1 || compra por id
router.put('/', comprasController_1.modificarCompra); // PUT http://localhost:3000/api/compras || modificar compra por id extraida del formulario
router.delete('/', comprasController_1.eliminarCompra); // DELETE http://localhost:3000/api/compras || eliminar compra por id extraida del formulario
router.post('/', comprasController_1.insertarCompra);
exports.default = router;
