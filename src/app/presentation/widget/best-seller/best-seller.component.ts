import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../application/models/interface-product';
import { CartService } from '../../../services/cart.service';
import { ProductsData } from '../../../config/service/constants';
import { bs_recambio } from '../../../config/service/BS-recambio';
import { Router } from '@angular/router';


@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule,
  ],
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
})
export class BestSellerComponent {
  products: IProduct[] = bs_recambio
  cartService = inject(CartService)
  @Input()
  inputData: IProduct = ProductsData[0]
  private router = inject(Router)


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
  
  getDiscountedPrice(p: IProduct): number {
    if (!p.discount) return p.precio;
    // Extrae solo el número del string '20%'
    const match = String(p.discount).match(/(\d+(?:\.\d+)?)/);
    if (!match) return p.precio;
    const pct = parseFloat(match[1]);
    if (isNaN(pct)) return p.precio;
    return +(p.precio * (1 - pct / 100)).toFixed(2);
    
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  /**
   * Navega al detalle del producto recibido.
   * Acepta tanto el objeto `IProduct` como directamente su `id`.
   */
  openItem(productOrId: IProduct | string | number) {
    const id = typeof productOrId === 'object' && productOrId !== null ? (productOrId as IProduct).id : productOrId;
    console.log('navegar a item', id);
    this.router.navigate(['/item', id]);
  }

}