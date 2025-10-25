import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./presentation/widget/header/header.component";
import { CartService, ITProduct } from './services/cart.service';
import { FooterComponent } from './presentation/widget/footer/footer.component';
import { fadeScale } from './presentation/animations/fade-scale';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  animations: [
    fadeScale
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  cartService = inject(CartService)
  contact = '584140530043'
  whatsapp = `https://wa.me/${this.contact}?text=Hola%2C%20quiero%20más%20información%20sobre:%20`
  private router = inject(Router)
  cart: ITProduct[] = []

  ngOnInit(): void {
    this.cartService.initProducts()
    this.cartService.products$.subscribe(data => {
      this.cart = data
    })
  }

  openWhatsApp() {
    const message = this.cart.map(item =>`• ${item.product.description} x${item.quantity} - COD:${item.product.codigo}`).join('%0A')
    const text = `${this.whatsapp}%0A${message}`
    window.open(text, '_blank')
  }
  
  goWhere(url: string) {
    this.router.navigateByUrl(url)
  }

}
