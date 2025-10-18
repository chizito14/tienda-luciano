import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../application/models/interface-product';
import { ProductsData } from '../../../config/service/constants';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {

  @Input()
  inputData: IProduct = ProductsData[0]
  cartService = inject(CartService)
  
  addItem() {
    this.cartService.addProduct(this.inputData) 
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
