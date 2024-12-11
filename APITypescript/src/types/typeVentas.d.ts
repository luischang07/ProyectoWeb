
export interface Ventas {
    id: number,
    id_articulo: number,
    id_cliente: number,
    cantidad: number,
    precio: number,
    IVA: number,
    subtotal: number,
    total: number,
}

export type VentasNuevo = Omit<Ventas, 'id'>;