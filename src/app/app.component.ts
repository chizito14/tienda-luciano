import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./presentation/widget/header/header.component";
import { CartService, ITProduct } from './services/cart.service';
import { FooterComponent } from './presentation/widget/footer/footer.component';
import { trigger, transition, style, animate } from '@angular/animations';
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
  // para animar el contador cuando se agrega un item
  bump = false
  private prevCount = 0
  private _bumpTimer: any = null

  ngOnInit(): void {
    this.cartService.initProducts()
    this.cartService.products$.subscribe(data => {
      // datos del carrito (array de ITProduct)
      const items = data ?? []
      // contar unidades totales (sum of quantities)
      const newCount = items.reduce((s, it) => s + (it.quantity || 0), 0)
      if (newCount > this.prevCount) {
        this.triggerBump()
      }
      this.prevCount = newCount
      this.cart = items
    })
  }

  private triggerBump() {
    // reiniciar timer si hay sucesivas adiciones
    if (this._bumpTimer) {
      clearTimeout(this._bumpTimer)
      this._bumpTimer = null
    }
    this.bump = false
    // small timeout to re-trigger CSS animation reliably
    setTimeout(() => this.bump = true, 10)
    this._bumpTimer = setTimeout(() => {
      this.bump = false
      this._bumpTimer = null
    }, 600)
  }

  get totalUnits() {
    return this.cart.reduce((s, it) => s + (it.quantity || 0), 0)
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
