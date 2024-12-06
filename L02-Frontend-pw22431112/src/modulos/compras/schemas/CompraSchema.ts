import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const validaciones = {
    precio: "Debe ser un número positivo",
    id: "Debe ser un número entero positivo",
    cantidad: "La cantidad ser un número entero positivo",
    IVA: "El IVA debe ser un número positivo",
    subtotal: "El subtotal debe ser un número positivo",
    fecha: "La fecha de compra debe tener el formato yyyy-mm-dd"
};


export const CompraSchema = toTypedSchema(
    z.object({
        id: z.number().int().positive(validaciones.id),
        id_articulo: z.number().int().positive(validaciones.id),
        cantidad: z.number({message:"La cantidad debe ser un numero"}).int("La cantidad debe ser entero").positive(validaciones.cantidad),
        precio: z.preprocess((val) => parseFloat(val as string), 
            z.number({message:"El precio debe ser un numero"}).positive(validaciones.precio)
        ),
        IVA: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.IVA)
        ),
        subtotal: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.subtotal)
        ),
        total: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive("El total debe ser un número positivo")
        ),
        fecha_compra: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha),
    })
);

export const CompraAgregarSchema = toTypedSchema(
    z.object({
        id_articulo: z.number().int().positive(validaciones.id),
        cantidad: z.number({message:"La cantidad debe ser un numero"}).int("La cantidad debe ser un numero entero").positive(validaciones.cantidad),
        precio: z.preprocess((val) => parseFloat(val as string), 
            z.number({message:"El precio debe ser un numero"}).positive(validaciones.precio)
        ),
        IVA: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.IVA)
        ),
        subtotal: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.subtotal)
        ),
        total: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive("El total debe ser un número positivo")
        ),
        fecha_compra: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha),
    })
);