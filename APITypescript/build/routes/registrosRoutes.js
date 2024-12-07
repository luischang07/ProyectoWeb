"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registrosController_1 = require("../controller/registrosController");
const router = express_1.default.Router();
router.get('/', registrosController_1.obtenerRegistros);
router.post('/', registrosController_1.insertarRegistro);
router.delete('/:id', registrosController_1.borrarRegistro);
exports.default = router;
