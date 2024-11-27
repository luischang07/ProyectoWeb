import express from "express";
import { actualizarCliente, eliminarCliente, insertarCliente, obtenerClientes } from "../controller/clientesController";

const router = express.Router();

router.get('/', obtenerClientes);
router.get('/:id', obtenerClientes);

router.post('/', insertarCliente);

router.put('/', actualizarCliente);

router.delete('/',eliminarCliente);




export default router;