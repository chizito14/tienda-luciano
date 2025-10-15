import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../../application/models/interface-product';
import { CartService } from '../../../services/cart.service';
import { CardItemComponent } from '../../widget/card-item/card-item.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CardItemComponent
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
  cart: IProduct[] = []

}
