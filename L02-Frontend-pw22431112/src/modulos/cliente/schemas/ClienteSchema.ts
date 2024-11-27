import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const clienteSchema = toTypedSchema(
    zod.object({
        id: zod.number({ message: 'Requerido' }).int().positive({ message: 'Debe ser un número positivo' }),
        nombre: zod.string({ message: 'Requerido' })
            .min(3, { message: 'Debe tener al menos 3 caracteres' })
            .max(200, { message: 'Debe tener menos de 200 caracteres' }),
        direccion: zod.string({ message: 'Requerido' })
            .min(1, { message: 'Dirección requerida' })
            .max(200, { message: 'Debe tener menos de 200 caracteres' }),
        telefono: zod.string({ message: 'Requerido' })
            .min(10, { message: 'Debe tener al menos 10 caracteres' })
            .max(15, { message: 'Debe tener menos de 15 caracteres' }),
        correo_electronico: zod.string({ message: 'Requerido' })
            .min(1, { message: 'Correo requerido' })
            .max(200, { message: 'Debe tener menos de 200 caracteres'})
            .email({ message: 'Debe ser un correo electrónico válido' }),
        ciudad: zod.string({ message: 'Requerido' })
    }).or(
        zod.object({
            nombre: zod.string({ message: 'Requerido' })
                .min(3, { message: 'Debe tener al menos 3 caracteres' })
                .max(200, { message: 'Debe tener menos de 200 caracteres' }),
            direccion: zod.string({ message: 'Requerido' })
                .min(1, { message: 'Dirección requerida' })
                .max(200, { message: 'Debe tener menos de 200 caracteres' }),
            telefono: zod.string({ message: 'Requerido' })
                .min(10, { message: 'Debe tener al menos 10 caracteres' })
                .max(15, { message: 'Debe tener menos de 15 caracteres' }),
            correo_electronico: zod.string({ message: 'Requerido' })
                .min(1, { message: 'Correo requerido' })
                .email({ message: 'Debe ser un correo electrónico válido' }),
            ciudad: zod.string({ message: 'Requerido' })
                .min(1, { message: 'Ciudad requerida' })
        })
    )
);