import express from 'express';
import { obtenerRegistros, insertarRegistro, borrarRegistro } from '../controller/registrosController';


const router = express.Router();


router.get('/',obtenerRegistros);

router.post('/',insertarRegistro);

router.delete('/:id',borrarRegistro);

export default router;