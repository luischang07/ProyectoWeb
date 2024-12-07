"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registroSchema = void 0;
const zod_1 = require("zod");
const timeRegex = () => zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/);
exports.registroSchema = zod_1.z.object({
    id_personal: zod_1.z.number().int(),
    fecha: zod_1.z.date(),
    hora: timeRegex(),
    movimiento: zod_1.z.enum(['entrada', 'salida'])
});
