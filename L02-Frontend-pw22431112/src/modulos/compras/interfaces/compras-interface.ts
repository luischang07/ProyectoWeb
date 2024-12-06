// `id` int(11) NOT NULL AUTO_INCREMENT,
// `id_articulo` int(11) NOT NULL,
// `cantidad` int NOT NULL,
// `precio` decimal(10,2) NOT NULL,
// `IVA` decimal(10,2) NOT NULL,
// `subtotal` decimal(10,2) NOT NULL,
// `total` decimal(10,2) NOT NULL,
// `fecha_compra` DATETIME DEFAULT NULL,


export interface Compra{
    id: number,
    id_articulo: number,
    cantidad: number,
    precio: number,
    IVA: number,
    subtotal: number,
    total: number,
    fecha_compra: string | Date | null
}

export interface CompraAgregar{
    id_articulo: number,
    cantidad: number,
    precio: number,
    IVA: number,
    subtotal: number,
    total: number,
    fecha_compra: string | Date | null
}
