


export interface IProduct {
  
  id?: number
  cantidad?: number
  codigo?: string
  discount?: string 

  precio: number
  imagen: string
  description: string // Nombre
  especificaciones?: string // Descripcion
  
}