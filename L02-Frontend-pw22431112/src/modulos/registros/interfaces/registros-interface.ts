export interface Registro {
    id: number,
    id_personal: number,
    fecha: string | Date | null,
    hora: string | Date | null,
    movimiento: 'entrada' | 'salida'
}

export interface RegistroAgregar {
    id_personal: number,
    movimiento: 'entrada' | 'salida'
}