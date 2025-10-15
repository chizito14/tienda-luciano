import { Product } from './interface-product';

/**
 * Modelo específico para productos "Best Seller".
 * Extiende la interfaz base `Product` añadiendo campos útiles para
 * mostrar tarjetas destacadas y atributos de venta.
 */
export interface BestSellerProduct extends Product {
  rating?: number; // valoración promedio (0-5)
  soldCount?: number; // unidades vendidas
  isNew?: boolean; // marca para resaltar productos nuevos
}
