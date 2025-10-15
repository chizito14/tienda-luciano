import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../application/models/interface-product';
import { BestSellerProduct } from '../../../application/models/best-seller.model';


@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toyota.component.html',
  styleUrls: ['./toyota.component.scss'],
})
export class ToyotaComponent {
  // productos de ejemplo; en el futuro estos vendrán de un JSON/servicio
  products: BestSellerProduct[] = [
    { id: 1, imagen: './assets/img-product/alternador toyota 4.5 1fz.jpeg', cantidad: 10, precio: 199.99, description: 'Alternador Toyota 4.5 1FZ', especificaciones: 'Repuesto original', codigo: 'ALT-1', discount: '20%', rating: 4.5, soldCount: 120 },
    { id: 2, imagen: './assets/img-product/1-2-kit-charnellacabezote-toyota-3f.jpeg', cantidad: 15, precio: 89.99, description: 'Kit charnela cabezote Toyota', especificaciones: 'Repuesto compatible', codigo: 'KIT-2', rating: 4.1, soldCount: 76 },
    { id: 3, imagen: './assets/img-product/1.2 kit charnela machito-hembrita 4.5.jpeg', cantidad: 8, precio: 129.99, description: 'Cruceta y piezas', especificaciones: 'Alta durabilidad', codigo: 'CRU-3', discount: '15%', rating: 4.7, soldCount: 200, isNew: true },
    { id: 4, imagen: './assets/img-product/aspa ventilador machito autana.jpeg', cantidad: 20, precio: 59.99, description: 'Aspa ventilador', especificaciones: 'Metal reforzado', codigo: 'ASP-4', rating: 3.9, soldCount: 34 },
  ];

  // producto seleccionado (para destacar la tarjeta o enviar al carrito)
  selectedId?: number;

  /**
   * Devuelve el identificador único de un producto para usar como función `trackBy` en un `*ngFor`.
   *
   * Esta función permite a Angular identificar de forma estable cada elemento de la lista (usando `item.id`),
   * evitando recrear el DOM de elementos que no han cambiado cuando la colección se actualiza — con lo que se mejora el rendimiento.
   *
   * @param _ - Índice del elemento en la iteración (parámetro requerido por la firma de `trackBy`; no se utiliza).
   * @param item - Objeto `Product` cuyo identificador único será devuelto.
   * @returns El identificador único del producto (por ejemplo, `number` o `string`) que Angular usará para comparar elementos.
   */
  trackById(_: number, item: Product) {
    return item.id;
  }

  /** Marca un producto como seleccionado por id. */
  selectProduct(id: number) {
    this.selectedId = id === this.selectedId ? undefined : id;
  }

  /**
   * Calcula el precio después de aplicar el descuento.
   * - `p.precio` debe ser un número (precio original).
   * - `p.discount` es una cadena con porcentaje (ej. '20%').
   * Devuelve el precio con descuento como número.
   */
  getDiscountedPrice(p: Product): number {
    if (!p.discount) return p.precio;
    // Extrae solo el número del string '20%'
    const match = String(p.discount).match(/(\d+(?:\.\d+)?)/);
    if (!match) return p.precio;
    const pct = parseFloat(match[1]);
    if (isNaN(pct)) return p.precio;
    return +(p.precio * (1 - pct / 100)).toFixed(2);
    
  }

  /** Formatea un número como precio en USD (ej. 199.99 -> '$199.99'). */
  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}

