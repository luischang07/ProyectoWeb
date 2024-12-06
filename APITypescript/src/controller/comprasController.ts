import { Request, Response } from "express";
import * as comprasServices from '../services/comprasServices';


export const obtenerCompras = async (req: Request, res: Response) => { 

    try {
        const data = await comprasServices.getCompras(req);
        res.json(data);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las compras' });
    }
}

export const obtenerCompraSinPaginacion = async (_req: Request, res: Response) => {
    try {
        const data = await comprasServices.getCompraSinPaginacion();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las compras' });
    }
}

export const obtenerCompraPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await comprasServices.getCompraById(Number(id));
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la compra' });
    }
}
export const modificarCompra = async (req: Request, res: Response) => {
    try {
        const data = await comprasServices.updateCompra(req.body);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al modificar la compra' });
    }
}

export const eliminarCompra = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const data = await comprasServices.deleteCompra(id);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar la compra' });
    }
}

export const insertarCompra = async (req: Request, res: Response) => {
    try {
        const data = await comprasServices.createCompra(req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al insertar la compra' });
    }
}