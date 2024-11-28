export interface Articulo {
    id: number,
    descripcion: string,
    precio: number,
    cantidad_en_almacen: number,
    fecha_caducidad: Date,
}

export interface ArticuloNuevo {
    descripcion: string,
    precio: number,
    cantidad_en_almacen: number,
    fecha_caducidad: Date,
}