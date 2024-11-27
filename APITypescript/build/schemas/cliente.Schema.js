"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteSchema = exports.ClienteNuevoSchema = void 0;
const zod_1 = require("zod");
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
exports.ClienteNuevoSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    nombre: zod_1.z.string().regex(nombreRegex, validaciones.nombre),
    direccion: zod_1.z.string().min(2, validaciones.direccionMin).max(300, validaciones.direccionMax),
    telefono: zod_1.z.string().regex(telRegex, validaciones.telefono),
    correo_electronico: zod_1.z.string().email(validaciones.correo),
    ciudad: zod_1.z.string()
});
exports.ClienteSchema = zod_1.z.object({
    nombre: zod_1.z.string().regex(nombreRegex, validaciones.nombre),
    direccion: zod_1.z.string().min(2, validaciones.direccionMin).max(300, validaciones.direccionMax),
    telefono: zod_1.z.string().regex(telRegex, validaciones.telefono),
    correo_electronico: zod_1.z.string().email(validaciones.correo),
    ciudad: zod_1.z.string()
});
