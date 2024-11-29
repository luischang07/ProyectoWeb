export interface Registros{
    id_personal: number,
    fecha :Date | string,
    hora: Date | string,
    movimiento: 'entrada' | 'salida',
}