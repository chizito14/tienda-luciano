import { Component, inject, Input } from '@angular/core';
import { ProductsData } from '../../../config/service/constants';
import { CartService, ITProduct } from '../../../services/cart.service';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  @Input()
  inputData: ITProduct = { product: ProductsData[0], quantity: 0 }
  cartService = inject(CartService)
  
  addUnit() {
    this.cartService.addUnit(this.inputData)
  }

  delUnit() {
    this.cartService.delUnit(this.inputData)
  }

}
