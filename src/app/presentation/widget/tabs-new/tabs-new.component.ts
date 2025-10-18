import { Component, inject } from '@angular/core';
import { IProduct } from '../../../application/models/interface-product';
import { bs_recambio } from '../../../config/service/BS-recambio';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tabs-new',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './tabs-new.component.html',
  styleUrl: './tabs-new.component.scss'
})
export class TabsNewComponent {
  products: IProduct[] = bs_recambio
  cartService = inject(CartService)

  addItem(item: IProduct) {
        this.cartService.addProduct(item)
    }
  trackById(_: number, item: IProduct) {
    return item.id;
  }
  getDiscountedPrice(p: IProduct): number {
    if (!p.discount) return p.precio;
    const match = String(p.discount).match(/(\d+(?:\.\d+)?)/);
    if (!match) return p.precio;
    const pct = parseFloat(match[1]);
    if (isNaN(pct)) return p.precio;
    return +(p.precio * (1 - pct / 100)).toFixed(2);
    
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

}
