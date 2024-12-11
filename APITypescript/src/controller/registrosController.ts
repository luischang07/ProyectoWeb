import { getRegistros, createRegistro, deleteRegistro } from "../services/registrosServices";
import { Request, Response } from "express";


export const obtenerRegistros = async (_req: Request, res: Response) => {
    try {
        const registros = await getRegistros();
        res.json(registros);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se pudieron obtener los registros' });
    }
};

export const insertarRegistro = async (req: Request, res: Response) => {
    try {
        const { id_personal, movimiento } = req.body;

        const fecha = new Date().toLocaleDateString('en-US');

        const hora = new Date().toLocaleTimeString('en-US', { hour12: false });

        console.group(fecha + " ---- " + hora);

        const registro = { id_personal, fecha, hora, movimiento };
        const resultado = await createRegistro(registro);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo insertar el registro' });
    }
};

export const borrarRegistro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultado = await deleteRegistro(parseInt(id));
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo borrar el registro' });
    }
};