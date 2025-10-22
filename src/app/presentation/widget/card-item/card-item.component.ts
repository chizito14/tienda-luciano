import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../application/models/interface-product';
import { ProductsData } from '../../../config/service/constants';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

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
  private router = inject(Router)
  
  addItem() {
    this.cartService.addProduct(this.inputData) 
  }

  openItem() {
    const codigo = this.inputData.codigo
    console.log('navegar a item', codigo)
    this.router.navigate(['/item', codigo])
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
