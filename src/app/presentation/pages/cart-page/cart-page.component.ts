import { Component, inject, OnInit } from '@angular/core';
import { CartService, ITProduct } from '../../../services/cart.service';
import { CartItemComponent } from '../../widget/cart-item/cart-item.component';
import { ProductsData } from '../../../config/service/constants';
import { SeoService } from '../../../services/seo.service';

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
  seo = inject(SeoService)
  
  ngOnInit(): void {
    this.seo.title.setTitle('Repuesto de Vehiculos | LuciShop');
    this.seo.meta.updateTag({ name: 'description', content: 'Compra de respuestos de vehiculos con envío gratis y descuentos exclusivos.' });
    this.seo.setCanonicalURL('https://web-gyyu6m1m320a.up-de-fra1-k8s-1.apps.run-on-seenode.com/cart/');
    this.seo.setIndexFollow(false)
        
    this.cartService.products$.subscribe(data => {
      this.cart = data
    })
  }

  cartService = inject(CartService)
  cart: ITProduct[] = []

  cleanList() {
    this.cartService.cleanProduct()
  }

}
