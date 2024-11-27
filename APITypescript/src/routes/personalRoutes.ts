import express = require('express');
import { eliminarPersonal, insertarPersonal, modificarPersonal, obtenerPersonal, obtenerPorTelefono, obtenerUnPersonal } from '../controller/personalController'
const router = express.Router();


router.get('/', obtenerPersonal);
router.get('/:id', obtenerUnPersonal);
router.get('/telefono/:telefono', obtenerPorTelefono);

router.post('/', insertarPersonal);

router.put('/', modificarPersonal);

router.delete('/',eliminarPersonal);

export default router;