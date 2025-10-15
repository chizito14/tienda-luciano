import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../application/models/interface-product';


@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
})
export class BestSellerComponent {
  // productos de ejemplo; en el futuro estos vendrán de un JSON/servicio
  products: IProduct[] = [
    { id: 1, imagen: './assets/img-product/alternador toyota 4.5 1fz.jpeg', cantidad: 10, precio: 199.99, description: 'Smartphone de alta gama con cámara de 48MP.', especificaciones: 'Pantalla: 6.5" OLED, Cámara: 48MP, Batería: 4000mAh', codigo: 'SPH-001', discount: '20%' },
    { id: 2, imagen: './assets/img-product/1-2-kit-charnellacabezote-toyota-3f.jpeg', cantidad: 15, precio: 89.99, description: 'Auriculares inalámbricos con cancelación de ruido', especificaciones: 'Tipo: Inalámbricos, Cancelación de ruido, Batería: 20h', codigo: 'AUR-002' },
    { id: 3, imagen: './assets/img-product/1.2 kit charnela machito-hembrita 4.5.jpeg', cantidad: 8, precio: 129.99, description: 'Reloj inteligente con monitor de ritmo cardíaco ', especificaciones: 'Monitor de ritmo cardíaco, GPS, Resistente al agua', codigo: 'REL-003', discount: '15%' },
    { id: 4, imagen: './assets/img-product/aspa ventilador machito autana.jpeg', cantidad: 20, precio: 59.99, description: 'Altavoz Bluetooth portátil con sonido de alta calidad', especificaciones: 'Bluetooth 5.0, Sonido de alta calidad, Batería: 12h', codigo: 'ALT-004' },
    { id: 5, imagen: './assets/img-product/bomba de agua autana-burbuja-machito.jpeg', cantidad: 5, precio: 299.99, description: 'Tablet de 10" con pantalla Retina y almacenamiento de 128GB.', especificaciones: 'Pantalla: 10" Retina, Almacenamiento: 128GB, Cámara: 12MP', codigo: 'TAB-005', discount: '10%' },
    { id: 5, imagen: './assets/img-product/buje barra panhard del 4.5.jpeg', cantidad: 5, precio: 299.99, description: 'Tablet de 10" con pantalla Retina y almacenamiento de 128GB.', especificaciones: 'Pantalla: 10" Retina, Almacenamiento: 128GB, Cámara: 12MP', codigo: 'TAB-005' },
    { id: 5, imagen: './assets/img-product/cruceta machito 4.5 samurai-dyna-fj40.jpeg', cantidad: 5, precio: 299.99, description: 'Tablet de 10" con pantalla Retina y almacenamiento de 128GB.', especificaciones: 'Pantalla: 10" Retina, Almacenamiento: 128GB, Cámara: 12MP', codigo: 'TAB-005' },
    { id: 5, imagen: './assets/img-product/empacadura de bajantehilux 3f.jpeg', cantidad: 5, precio: 299.99, description: 'Tablet de 10" con pantalla Retina y almacenamiento de 128GB.', especificaciones: 'Pantalla: 10" Retina, Almacenamiento: 128GB, Cámara: 12MP', codigo: 'TAB-005' },

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
  trackById(_: number, item: IProduct) {
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
  getDiscountedPrice(p: IProduct): number {
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

