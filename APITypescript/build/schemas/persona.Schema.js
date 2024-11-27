"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaSchema = exports.personaNewSchema = void 0;
const zod_1 = require("zod");
const telRegex = new RegExp('^[0-9]{10}$');
const nombreRegex = new RegExp('^[a-zA-Z ]{2,50}$');
//validar datos con zod - construir schema
exports.personaNewSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive().min(1),
    nombre: zod_1.z.string().regex(nombreRegex, 'El nombre solo puede llevar letras y el tamaño debe ser entre 2 y 50 caracteres'),
    direccion: zod_1.z.string().min(2, 'La direccion debe llevar minimo 2 caracteres').max(300, 'La direccion debe llevar maximo 300 caracteres'),
    telefono: zod_1.z.string().regex(telRegex, 'El telefono deben ser solo numeros y el tamaño debe ser de 10 digitos'),
    estatus: zod_1.z.string().min(1, 'El estatus debe ser minimo 1 digito').max(1, 'Maximo 1 digito')
});
exports.personaSchema = zod_1.z.object({
    nombre: zod_1.z.string().regex(nombreRegex, 'El nombre solo puede llevar letras y el tamaño debe ser entre 2 y 50 caracteres'),
    direccion: zod_1.z.string().min(2, 'La direccion debe llevar minimo 2 caracteres').max(300, 'La direccion debe llevar maximo 300 caracteres'),
    telefono: zod_1.z.string().regex(telRegex, 'El telefono deben ser solo numeros y el tamaño debe ser de 10 digitos'),
    estatus: zod_1.z.string().min(1, 'Un solo numero permitido').max(1, 'Un solo numero permitido')
}).or(zod_1.z.object({
    id: zod_1.z.number().int().positive().min(1)
})).or(zod_1.z.object({
    telefono: zod_1.z.string().regex(telRegex, 'El telefono deben ser solo numeros y el tamaño debe ser de 10 digitos')
}));
