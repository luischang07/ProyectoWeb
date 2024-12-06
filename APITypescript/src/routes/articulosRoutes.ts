import express from 'express';
import { actualizarArticulo, eliminarArticulo, insertarArticulo, obtenerArticulos, obtenerUnArticulo,obtenerArticulosSinPaginar } from '../controller/articulosController';

const router = express.Router();




router.get('/',obtenerArticulos);
router.get('/getArticulos',obtenerArticulosSinPaginar); // GET http://localhost:3001/api/articulos

router.get('/:id',obtenerUnArticulo); // GET http://localhost:3001/api/articulos/1

router.post('/',insertarArticulo);

router.put('/',actualizarArticulo);

router.delete('/',eliminarArticulo);








export default router;