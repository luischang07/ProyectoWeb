import { z} from 'zod';

//expresiones regulares

const validaciones = {
    descripcionMin: "La descripción debe tener mas de 2",
    descripcionMax: "La descripción debe tener menos de 300 caracteres",
    cantidad_en_almacen:"La cantidad en almacen debe ser un número entero",
    fecha_caducidad: "La fecha de caducidad debe tener el formato dd-mm-aaaa",
    precio: "El precio debe ser un número positivo"
};

//validar datos con zod - construir schema
export const ArticuloNuevoSchema = z.object({
    id: z.number().int(),
    descripcion: z.string().min(2,validaciones.descripcionMin).max(300,validaciones.descripcionMax),
    precio: z.preprocess((val) => parseFloat(val as string), z.number().positive(validaciones.precio)),
    cantidad_en_almacen: z.number().int().positive(validaciones.cantidad_en_almacen),
    fecha_caducidad: z.date()
})

export const ArticuloSchema = z.object({
    descripcion: z.string().min(2,validaciones.descripcionMin).max(300,validaciones.descripcionMax),
    precio: z.preprocess((val) => parseFloat(val as string), z.number().positive(validaciones.precio)),
    cantidad_en_almacen: z.number().int().positive(validaciones.cantidad_en_almacen),
    fecha_caducidad: z.date()
})