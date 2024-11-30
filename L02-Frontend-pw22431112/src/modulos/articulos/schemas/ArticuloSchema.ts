import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

// Expresiones regulares para la validación
const validaciones = {
    descripcionMin: "La descripción debe tener más de 2 caracteres",
    descripcionMax: "La descripción debe tener menos de 300 caracteres",
    cantidad_en_almacen: "La cantidad en almacén debe ser un número entero positivo",
    fecha_caducidad: "La fecha de caducidad debe tener el formato yyyy-mm-dd",
    precio: "El precio debe ser un número positivo",
    requerido: "Este campo es requerido"
};

// Validar datos con zod - construir esquema para editar artículo
export const ArticuloEditarSchema = toTypedSchema(
    z.object({
        id: z.number().int().positive("Debe ser un número entero positivo"),
        descripcion: z.string()
            .min(2, validaciones.descripcionMin)
            .max(300, validaciones.descripcionMax),
        // Usamos preprocess para asegurarnos de que 'precio' es un número flotante
        precio: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.precio)
        ),
        cantidad_en_almacen: z.number().int('Debe ser entero').positive(validaciones.cantidad_en_almacen),
        // Permitir nulos en el campo 'fecha_caducidad'
        fecha_caducidad: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha_caducidad).or(z.null()), // Permite null
    })
);

export const ArticuloAgregarSchema = toTypedSchema(
    z.object({
        descripcion: z.string()
            .min(2, validaciones.descripcionMin)
            .max(300, validaciones.descripcionMax),
        // Usamos preprocess para asegurarnos de que 'precio' es un número flotante
        precio: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.precio)
        ),
        cantidad_en_almacen: z.number().int('Debe ser entero').positive(validaciones.cantidad_en_almacen),
        // Permitir nulos en el campo 'fecha_caducidad'
        fecha_caducidad: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha_caducidad).or(z.null()), // Permite null
    })
);
