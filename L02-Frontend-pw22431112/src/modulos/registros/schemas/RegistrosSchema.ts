import { toTypedSchema } from "@vee-validate/zod";
import { tokenToString } from "typescript";
import zod  from "zod";

export const RegistrosSchema = toTypedSchema( 
    zod.object({
        id_personal:zod.number({ message: 'Requerido' }),
        movimiento: zod.string({ message: 'Requerido' })
    })
)