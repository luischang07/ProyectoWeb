import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ventasSchema = toTypedSchema(
    zod.object({
        cantidad: zod.number({ message: 'Requerido1' }).positive({ message: 'Debe ser un número positivo' }),
        precio: zod.preprocess((val) => parseFloat(val as string),
            zod.number().positive("El precio debe ser un número positivo")
        ),
        IVA: zod.preprocess((val) => parseFloat(val as string),
            zod.number().positive("El IVA debe ser un número positivo")
        ),
        subtotal: zod.preprocess((val) => parseFloat(val as string),
            zod.number().positive("El subtotal debe ser un número positivo")
        ),
        total: zod.preprocess((val) => parseFloat(val as string),
            zod.number().positive("El total debe ser un número positivo")
        )
    }).or(
        zod.object({
            cantidad: zod.number({ message: 'Requerido2' }).positive({ message: 'Debe ser un número positivo' }),
            precio: zod.preprocess((val) => parseFloat(val as string),
                zod.number().positive("El precio debe ser un número positivo")
            ),
            IVA: zod.preprocess((val) => parseFloat(val as string),
                zod.number().positive("El IVA debe ser un número positivo")
            ),
            subtotal: zod.preprocess((val) => parseFloat(val as string),
                zod.number().positive("El subtotal debe ser un número positivo")
            ),
            total: zod.preprocess((val) => parseFloat(val as string),
                zod.number().positive("El total debe ser un número positivo")
            )
        })
    )
)
