import * as ClienteService from '../services/clientesServices';
import { Request, Response } from 'express';

export const obtenerClientes = async (_req: Request, res: Response) => {
    let clientes = await ClienteService.getClientes();
    res.json(clientes);
};

export const obtenerUnCliente = async (req: Request, res: Response) => {
    let cliente = await ClienteService.getClienteOne(Number(req.params.id));
    res.json(cliente);
}

export const insertarCliente = async (req: Request, res: Response) => {
    try {
        const { nombre, direccion, telefono, correo_electronico, ciudad } = req.body;
        const nuevoCliente = await ClienteService.createCliente({ nombre, direccion, telefono, correo_electronico, ciudad });
        res.json(nuevoCliente);
    } catch (error) {
        res.send({ error: "No se puede crear el cliente" })
    }
};

export const actualizarCliente = async (req: Request, res: Response) => {
    try {
        const { id, nombre, direccion, telefono, correo_electronico, ciudad } = req.body;
        const clienteModificado = await ClienteService.updateCliente({ id, nombre, direccion, telefono, correo_electronico, ciudad });
        res.json(clienteModificado);
    } catch (error) {
        res.send({ error: "No se puede actualizar el cliente" })
    }
}

export const eliminarCliente = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const clienteEliminado = await ClienteService.deleteCliente(id);
        res.json(clienteEliminado);
    } catch (error) {
        res.send({ error: "No se puede eliminar el cliente" })
    }
};