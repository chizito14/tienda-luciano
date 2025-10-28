import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../application/models/interface-product';
import { bs_recambio, News_recambio } from '../../../config/service/BS-recambio';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ProductsData } from '../../../config/service/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'tabs-new',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './tabs-new.component.html',
  styleUrls: ['./tabs-new.component.scss']
})
export class TabsNewComponent {
  products: IProduct[] = News_recambio
  cartService = inject(CartService)
  private router = inject(Router)
   @Input()
    inputData: IProduct = ProductsData[0]

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

  openItem(productId: IProduct | string | number) {
    const id = typeof productId === 'object' && productId !== null ? (productId as IProduct).id : productId;
    console.log('navegar a item', id);
    this.router.navigate(['/item', id]);
  }

}
