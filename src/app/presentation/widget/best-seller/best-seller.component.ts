import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../application/models/interface-product';
import { ProductsData } from '../../../config/constants';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
})
export class BestSellerComponent {
  
  products: IProduct[] = ProductsData

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

