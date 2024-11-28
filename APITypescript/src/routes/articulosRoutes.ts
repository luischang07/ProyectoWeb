import express from 'express';
import { actualizarArticulo, eliminarArticulo, insertarArticulo, obtenerArticulos, obtenerUnArticulo } from '../controller/articulosController';

const router = express.Router();




router.get('/',obtenerArticulos);

router.get('/articulos/:id',obtenerUnArticulo);

router.post('/',insertarArticulo);

router.put('/',actualizarArticulo);

router.delete('/',eliminarArticulo);








export default router;