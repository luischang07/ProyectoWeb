import { z } from 'zod';

export const ventasSchema = z.object({
    id_articulo: z.number().int().positive().min(1, { message: "El id del artículo debe ser un número entero positivo mayor que 0" }),
    id_cliente: z.number().int().positive().min(1, { message: "El id del cliente debe ser un número entero positivo mayor que 0" }),
    cantidad: z.number().int().positive().min(1, { message: "La cantidad debe ser un número entero positivo mayor que 0" }),
    precio: z.number().positive({ message: "El precio debe ser un número positivo" }),
    IVA: z.number().positive({ message: "El IVA debe ser un número positivo" }),
    subtotal: z.number().positive({ message: "El subtotal debe ser un número positivo" }),
    total: z.number().positive({ message: "El total debe ser un número positivo" })
});
