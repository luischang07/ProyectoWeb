import {z} from 'zod';

const telRegex = new RegExp('^[0-9]{10}$');
const nombreRegex = new RegExp('^[a-zA-Z ]{2,50}$');


//validar datos con zod - construir schema
export const personaNewSchema = z.object({
    id: z.number().int().positive().min(1),
    nombre: z.string().regex(nombreRegex,'El nombre solo puede llevar letras y el tamaño debe ser entre 2 y 50 caracteres'),
    direccion: z.string().min(2,'La direccion debe llevar minimo 2 caracteres').max(300,'La direccion debe llevar maximo 300 caracteres'),
    telefono: z.string().regex(telRegex,'El telefono deben ser solo numeros y el tamaño debe ser de 10 digitos'),
    estatus: z.string().min(1,'El estatus debe ser minimo 1 digito').max(1,'Maximo 1 digito')
})

export const personaSchema = z.object({
    nombre: z.string().regex(nombreRegex,'El nombre solo puede llevar letras y el tamaño debe ser entre 2 y 50 caracteres'),
    direccion: z.string().min(2,'La direccion debe llevar minimo 2 caracteres').max(300,'La direccion debe llevar maximo 300 caracteres'),
    telefono: z.string().regex(telRegex,'El telefono deben ser solo numeros y el tamaño debe ser de 10 digitos'),
    estatus: z.string().min(1,'Un solo numero permitido').max(1,'Un solo numero permitido')
}).or(
    z.object({
        id: z.number().int().positive().min(1)
    })
).or(
    z.object({
        telefono: z.string().regex(telRegex,'El telefono deben ser solo numeros y el tamaño debe ser de 10 digitos')
    })
)