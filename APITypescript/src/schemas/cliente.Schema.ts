import {z} from 'zod';

const telRegex = new RegExp('^[0-9]{10}$');
const nombreRegex = new RegExp('^[a-zA-Z ]{2,50}$');


const validaciones = {
    nombre: 'El nombre solo puede llevar letras y el tamaño debe ser entre 2 y 50 caracteres',
    direccionMax: 'La direccion debe llevar maximo 300 caracteres',
    direccionMin: 'La direccion debe llevar minimo 2 caracteres',
    telefono: 'El telefono deben ser solo numeros y el tamaño debe ser de 10 digitos',
    correo: 'Ingresa un correo valido',
    ciudad: ''
};

//validar datos con zod - construir schema
export const ClienteNuevoSchema = z.object({
    id: z.number().int(),
    nombre: z.string().regex(nombreRegex,validaciones.nombre),
    direccion: z.string().min(2,validaciones.direccionMin).max(300,validaciones.direccionMax),
    telefono: z.string().regex(telRegex,validaciones.telefono),
    correo_electronico: z.string().email(validaciones.correo),
    ciudad: z.string()
})

export const ClienteSchema = z.object({
    nombre: z.string().regex(nombreRegex,validaciones.nombre),
    direccion: z.string().min(2,validaciones.direccionMin).max(300,validaciones.direccionMax),
    telefono: z.string().regex(telRegex,validaciones.telefono),
    correo_electronico: z.string().email(validaciones.correo),
    ciudad: z.string()
})