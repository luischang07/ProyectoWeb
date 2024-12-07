"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprasNuevoSchema = exports.comprasSchema = void 0;
const zod_1 = require("zod");
const validacion = {
    id: "La id debe ser un número entero",
    id_articulo: "La id del artículo debe ser un número entero",
    cantidad: "La cantidad debe ser un número entero positivo",
    precio: "El precio debe ser un número positivo",
    IVA: "El IVA debe ser un número positivo",
    subtotal: "El subtotal debe ser un número positivo",
    total: "El total debe ser un número positivo",
    fecha_compra: "La fecha de compra debe ser una fecha correcta",
};
exports.comprasSchema = zod_1.z.object({
    id: zod_1.z.number().int(validacion.id),
    id_articulo: zod_1.z.number().int(validacion.id_articulo),
    cantidad: zod_1.z.number().int().positive(validacion.cantidad),
    precio: zod_1.z.number().positive(validacion.precio),
    IVA: zod_1.z.number().positive(validacion.IVA),
    subtotal: zod_1.z.number().positive(validacion.subtotal),
    total: zod_1.z.number().positive(validacion.total),
    fecha_compra: zod_1.z.date(),
});
exports.comprasNuevoSchema = zod_1.z.object({
    id_articulo: zod_1.z.number().int(validacion.id_articulo),
    cantidad: zod_1.z.number().int().positive(validacion.cantidad),
    precio: zod_1.z.number().positive(validacion.precio),
    IVA: zod_1.z.number().positive(validacion.cantidad),
    subtotal: zod_1.z.number().positive(validacion.subtotal),
    total: zod_1.z.number().positive(validacion.total),
    fecha_compra: zod_1.z.date(),
});
// id: z.int(),
// id_articulo: number,
// cantidad: number,
// precio: number,
// IVA: number,
// subtotal: number,
// total: number,
// fecha_compra: Date,
