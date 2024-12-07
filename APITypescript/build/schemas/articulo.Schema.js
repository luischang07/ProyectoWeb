"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticuloSchema = exports.ArticuloNuevoSchema = void 0;
const zod_1 = require("zod");
//expresiones regulares
const validaciones = {
    descripcionMin: "La descripción debe tener mas de 2",
    descripcionMax: "La descripción debe tener menos de 300 caracteres",
    cantidad_en_almacen: "La cantidad en almacen debe ser un número entero",
    fecha_caducidad: "La fecha de caducidad debe tener el formato dd-mm-aaaa",
    precio: "El precio debe ser un número positivo"
};
//validar datos con zod - construir schema
exports.ArticuloNuevoSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    descripcion: zod_1.z.string().min(2, validaciones.descripcionMin).max(300, validaciones.descripcionMax),
    precio: zod_1.z.preprocess((val) => parseFloat(val), zod_1.z.number().positive(validaciones.precio)),
    cantidad_en_almacen: zod_1.z.number().int().positive(validaciones.cantidad_en_almacen),
    fecha_caducidad: zod_1.z.date()
});
exports.ArticuloSchema = zod_1.z.object({
    descripcion: zod_1.z.string().min(2, validaciones.descripcionMin).max(300, validaciones.descripcionMax),
    precio: zod_1.z.preprocess((val) => parseFloat(val), zod_1.z.number().positive(validaciones.precio)),
    cantidad_en_almacen: zod_1.z.number().int().positive(validaciones.cantidad_en_almacen),
    fecha_caducidad: zod_1.z.date()
});
