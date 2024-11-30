export interface Articulos{
    id: number,
    descripcion: string,
    precio: number,
    cantidad_en_almacen: number,
    fecha_caducidad: Date | string | null,
}

export type ArticulosAgregar =  Omit<Articulos, 'id'>;