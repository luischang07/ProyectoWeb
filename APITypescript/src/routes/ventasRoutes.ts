
import express = require('express');
import {
    eliminarVentas, insertarVentas, modificarVentas,
    obtenerUnaVenta, obtenerVentas, obtenerVentasSinPaginar
} from '../controller/ventasController';
const router = express.Router();

router.get('/', obtenerVentas);
router.get('/getVentas', obtenerVentasSinPaginar); // ruta para las ventas sin paginar localhost:30001/api/ventas/getVentas
router.get('/:id', obtenerUnaVenta);

router.post('/', insertarVentas);

router.put('/', modificarVentas);

router.delete('/', eliminarVentas);

export default router;