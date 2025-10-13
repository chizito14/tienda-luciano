export interface Product {
  id: number;
  imagen: string;
  cantidad: number;
  precio: number;
  description: string;
  especificaciones: string;
  codigo: string;
  discount?: string; // opcional, ejemplo: '20%'
}