import * as articulosServices from '../services/articulosServices';
import { Request, Response } from 'express';

export const obtenerArticulos = async (req: Request, res: Response) => {
    try {
        const articulos = await articulosServices.getArticulos(req);
        res.json(articulos);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede obtener los articulos' });
    }
};

export const obtenerUnArticulo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const articulo = await articulosServices.getArticuloOne(Number(id));
        res.json(articulo);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede obtener el articulo' });
    }
};

export const insertarArticulo = async (req: Request, res: Response) => {
    try {
        const { descripcion, precio,cantidad_en_almacen,fecha_caducidad} = req.body;
        const nuevoArticulo = await articulosServices.createArticulo({ descripcion, precio, cantidad_en_almacen , fecha_caducidad });
        res.json(nuevoArticulo);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede crear el articulo' });
    }
};

export const actualizarArticulo = async (req: Request, res: Response) => {
    try {
        const { id, descripcion, precio, cantidad_en_almacen, fecha_caducidad } = req.body;
        const articuloModificado = await articulosServices.updateArticulo({ id, descripcion, precio, cantidad_en_almacen, fecha_caducidad });
        res.json(articuloModificado);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede actualizar el articulo' });
    }
};

export const eliminarArticulo = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const articuloEliminado = await articulosServices.deleteArticulo(id);
        res.json(articuloEliminado);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'No se puede eliminar el articulo' });
    }
}
