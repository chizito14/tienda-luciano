


export interface IProduct {
  
  id?: number
  cantidad?: number
  codigo?: string
  discount?: string 
  rating?: number; // valoración promedio (0-5)
  soldCount?: number; // unidades vendidas
  isNew?: boolean; // marca para resaltar productos nuevos

  precio: number
  imagen: string
  description: string // Nombre
  especificaciones?: string // Descripcion


  
}