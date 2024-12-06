export interface Compras{ 
    id: number,
    id_articulo: number,
    cantidad: number,
    precio: number,
    IVA: number,
    subtotal: number,
    total: number,
    fecha_compra: Date,
};

export interface ComprasNuevo{
    id_articulo: number,
    cantidad: number,
    precio: number,
    IVA: number,
    subtotal: number,
    total: number,
    fecha_compra: Date,
}