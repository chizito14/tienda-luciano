import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./presentation/widget/header/header.component";
<<<<<<< HEAD
import { IProduct } from './application/models/interface-product';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
=======
import { CartService, ITProduct } from './services/cart.service';
import { FooterComponent } from './presentation/widget/footer/footer.component';
>>>>>>> a3a02f5d437421059950270e1e31945292d21e5d

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
<<<<<<< HEAD
    HttpClientModule
    
=======
    FooterComponent
>>>>>>> a3a02f5d437421059950270e1e31945292d21e5d
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
