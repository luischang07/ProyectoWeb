"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaSchema = exports.personaNewSchema = void 0;
const zod_1 = require("zod");
const telRegex = new RegExp('^[0-9]{10}$');
const nombreRegex = new RegExp('^[a-zA-Z ]{2,200}$');
//validar datos con zod - construir schema
exports.personaNewSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    nombre: zod_1.z.string().regex(nombreRegex, 'Solo puedes introducir letras y el tamaño debe ser entre 2 y 200 caracteres'),
    direccion: zod_1.z.string().min(2, 'Minimo 2 caracteres').max(300, 'Maximo 300 caracteres'),
    telefono: zod_1.z.string().regex(telRegex),
    estatus: zod_1.z.number().int().positive('Debe ser numero positivo o mayor a 0').min(1, 'Minimo 1 numero').max(2, 'Maximo 2 numeros')
}).refine(data => data.telefono.length == 10, {
    message: 'El telefono debe tener 10 caracteres',
    path: ['telefono']
});
exports.personaSchema = zod_1.z.object({
    nombre: zod_1.z.string().regex(nombreRegex, 'Solo puedes introducir letras y el tamaño debe ser entre 2 y 200 caracteres'),
    direccion: zod_1.z.string().min(2, 'Minimo 2 caracteres').max(300, 'Maximo 300 caracteres'),
    telefono: zod_1.z.string().regex(telRegex),
    estatus: zod_1.z.number().int().positive('Debe ser numero positivo o mayor a 0').min(1, 'Minimo 1 numero').max(2, 'Maximo 2 numeros')
}).refine(data => data.telefono.length == 10, {
    message: 'El telefono debe tener 10 caracteres',
    path: ['telefono']
});
