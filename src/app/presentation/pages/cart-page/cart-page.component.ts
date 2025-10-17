import { Component, inject, OnInit } from '@angular/core';
import { CartService, ITProduct } from '../../../services/cart.service';
import { CartItemComponent } from '../../widget/cart-item/cart-item.component';
import { ProductsData } from '../../../config/service/constants';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CartItemComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  
  ngOnInit(): void {
    this.cartService.products$.subscribe(data => {
      this.cart = data
    })
  }

  cartService = inject(CartService)
  cart: ITProduct[] = []

}
