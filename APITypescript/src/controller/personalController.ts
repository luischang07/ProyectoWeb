import * as PersonalServices from '../services/personalServices';
import { Request,Response } from 'express';


const obtenerPersonal = async(_req:Request, res:Response)=>{
    let personal = await PersonalServices.getPersonal();
    res.json(personal);
}

const obtenerUnPersonal= async (req:Request, res:Response)=>{
    let personal = await PersonalServices.getPersonalOne(Number(req.params.id));
    res.json(personal)
}

const obtenerPorTelefono = async (req:Request, res:Response)=>{
    let personalPorTelefono = await PersonalServices.getPersonalTelefono(req.params.telefono);
    res.json(personalPorTelefono);
}

const insertarPersonal = async(req:Request, res:Response)=>{

    try {
        const {nombre,direccion,telefono,estatus} = req.body;
        const nuevoPersonal = await PersonalServices.createPersonal({nombre,direccion,telefono,estatus});
        res.json(nuevoPersonal);
    } catch (error) {
        res.send({error:"No se puede crear el personal"})
    }
} 

const modificarPersonal = async(req:Request, res:Response)=>{
    try {
        const {id,nombre,direccion,telefono,estatus} = req.body;
        
        const modificado = await PersonalServices.updatePersonal({
            id,
            nombre,
            direccion,
            telefono,
            estatus
        });
        console.log(modificado);
        res.json(modificado);
    } catch (error) {
        res.json({error:"No se puede actualizar el personal"})
    }
}

const eliminarPersonal = async (req:Request, res:Response)=>{
    try {
        const {id} = req.body;
        const eliminado = await PersonalServices.deletePersonal(Number(id));
        res.json(eliminado);
    } catch (error) {
        res.json({error:"No se puede eliminar el personal"})
    }
}


export {
    obtenerPersonal,
    obtenerUnPersonal,
    obtenerPorTelefono,
    insertarPersonal,
    modificarPersonal,
    eliminarPersonal
}