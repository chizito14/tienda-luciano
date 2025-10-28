import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BestSellerComponent } from '../best-seller/best-seller.component';
import { IProduct } from '../../../application/models/interface-product';
import { CartService } from '../../../services/cart.service';
import { JsonDataService } from '../../../services/json-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toyota',
  standalone: true,
  imports: [CommonModule,BestSellerComponent],
  templateUrl: './toyota.component.html',
  styleUrls: ['./toyota.component.scss']
})
export class ToyotaComponent {
  cartService = inject(CartService)
  products: IProduct[] = []
  @Input()
  inputData?: IProduct
  private jsonService = inject(JsonDataService)
  private router = inject(Router)
 
  // Usamos OnInit para cargar los productos desde el servicio
  ngOnInit(): void {
    this.jsonService.getProducts().subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.products = res;
          if (!this.inputData && res.length) this.inputData = res[0];
        }
      },
      error: (err) => {
        // Si falla la carga del JSON, dejamos products vacío (o podría usarse un fallback)
        console.warn('No se pudieron cargar productos desde assets:', err);
      }
    })
  }
 
  addItem(item: IProduct) {
         this.cartService.addProduct(item)
     }
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

  openItem() {
    const codigo = this.inputData?.codigo;
    if (!codigo) {
      console.warn('openItem: producto sin código');
      return;
    }
    console.log('navegar a item', codigo);
    this.router.navigate(['/item', codigo]);
  }
}
