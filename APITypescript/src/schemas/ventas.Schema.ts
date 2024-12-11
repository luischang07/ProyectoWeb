
import { z } from 'zod';

export const ventasSchema = z.object({
    id: z.number().int().positive().min(1),
    id_articulo: z.number().int().positive().min(1),
    id_cliente: z.number().int().positive().min(1),
    cantidad: z.number().int().positive().min(1),
    precio: z.number().positive(),
    IVA: z.number().positive(),
    subtotal: z.number().positive(),
    total: z.number().positive()
});