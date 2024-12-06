import express from 'express';
import { obtenerCompraPorId, obtenerCompras, obtenerCompraSinPaginacion, modificarCompra, eliminarCompra, insertarCompra } from '../controller/comprasController';

const router = express.Router();




router.get('/',obtenerCompras);// GET http://localhost:3000/api/compras || compras paginadas
router.get('/getCompras',obtenerCompraSinPaginacion);// GET http://localhost:3000/api/compras/compras || todas las compras sin paginar
router.get('/:id',obtenerCompraPorId);// GET http://localhost:3000/api/compras/compras/1 || compra por id

router.put('/',modificarCompra);// PUT http://localhost:3000/api/compras || modificar compra por id extraida del formulario

router.delete('/',eliminarCompra);// DELETE http://localhost:3000/api/compras || eliminar compra por id extraida del formulario

router.post('/',insertarCompra);








export default router;