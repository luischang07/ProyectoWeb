import { z } from 'zod';

const timeRegex = () => z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/);

export const registroSchema = z.object({
    id_personal: z.number().int(),
    fecha: z.date(),
    hora: timeRegex(),
    movimiento: z.enum(['entrada', 'salida'])
});
