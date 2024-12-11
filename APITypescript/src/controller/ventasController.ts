
import * as VentasServices from '../services/ventasServices';
import { Request, Response } from 'express';

const obtenerVentas = async (req: Request, res: Response) => {
    try {
        const { page, limit, filterField, filterValue } = req.query;
        const ventas = await VentasServices.getVentas(Number(page), Number(limit), String(filterField), String(filterValue));
        res.json(ventas);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede obtener las ventas' });
    }
};

export const obtenerVentasSinPaginar = async (_req: Request, res: Response) => {
    try {
        const ventas = await VentasServices.getVentasAll();
        res.json(ventas);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede obtener las ventas' });
    }
};

const obtenerUnaVenta = async (req: Request, res: Response) => {
    let venta = await VentasServices.getVentasOne(Number(req.params.id));
    res.json(venta)
}

const insertarVentas = async (req: Request, res: Response) => {
    try {
        const { id_articulo, id_cliente, cantidad, precio, IVA, subtotal, total } = req.body;
        const nuevaVenta = await VentasServices.createVentas({ id_articulo, id_cliente, cantidad, precio, IVA, subtotal, total });
        res.json(nuevaVenta);
    } catch (error) {
        res.send({ error: "No se puede crear la venta" })
    }
}

const modificarVentas = async (req: Request, res: Response) => {
    try {
        const { id, id_articulo, id_cliente, cantidad, precio, IVA, subtotal, total } = req.body;

        const modificado = await VentasServices.updateVentas({
            id,
            id_articulo,
            id_cliente,
            cantidad,
            precio,
            IVA,
            subtotal,
            total,
        });
        res.json(modificado);
    } catch (error) {
        res.json({ error: "No se puede actualizar la venta" })
    }
}

const eliminarVentas = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await VentasServices.deleteVentas(Number(id));
        res.json(eliminado);
    } catch (error) {
        res.json({ error: "No se puede eliminar la venta" })
    }
}

export {
    obtenerVentas,
    obtenerUnaVenta,
    insertarVentas,
    modificarVentas,
    eliminarVentas
}