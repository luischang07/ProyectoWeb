import express = require('express');
import {
    eliminarPersonal, insertarPersonal, modificarPersonal, obtenerPersonal,
    obtenerPersonalSinPaginar, obtenerPorTelefono, obtenerUnPersonal
} from '../controller/personalController'
const router = express.Router();


router.get('/', obtenerPersonal);
router.get('/getPersonal', obtenerPersonalSinPaginar); // ruta para el personal sin paginar localhost:30001/api/personal/getPersonal
router.get('/:id', obtenerUnPersonal);
router.get('/telefono/:telefono', obtenerPorTelefono);

router.post('/', insertarPersonal);

router.put('/', modificarPersonal);

router.delete('/', eliminarPersonal);

export default router;