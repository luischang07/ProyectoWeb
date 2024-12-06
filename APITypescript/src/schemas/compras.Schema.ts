import {z} from 'zod';


const validacion = {
    id: "La id debe ser un número entero",
    id_articulo: "La id del artículo debe ser un número entero",
    cantidad: "La cantidad debe ser un número entero positivo",
    precio: "El precio debe ser un número positivo",
    IVA: "El IVA debe ser un número positivo",
    subtotal: "El subtotal debe ser un número positivo",
    total: "El total debe ser un número positivo",
    fecha_compra: "La fecha de compra debe ser una fecha correcta",
}

export const comprasSchema = z.object({ // para modificar compras
    id: z.number().int(validacion.id),
    id_articulo: z.number().int(validacion.id_articulo),
    cantidad: z.number().int().positive(validacion.cantidad),
    precio: z.number().positive(validacion.precio),
    IVA: z.number().positive(validacion.IVA),
    subtotal: z.number().positive(validacion.subtotal),
    total: z.number().positive(validacion.total),
    fecha_compra: z.date(),
});

export const comprasNuevoSchema = z.object({
    id_articulo: z.number().int(validacion.id_articulo),
    cantidad: z.number().int().positive(validacion.cantidad),
    precio: z.number().positive(validacion.precio),
    IVA: z.number().positive(validacion.cantidad),
    subtotal: z.number().positive(validacion.subtotal),
    total: z.number().positive(validacion.total),
    fecha_compra: z.date(),
})



// id: z.int(),
// id_articulo: number,
// cantidad: number,
// precio: number,
// IVA: number,
// subtotal: number,
// total: number,
// fecha_compra: Date,