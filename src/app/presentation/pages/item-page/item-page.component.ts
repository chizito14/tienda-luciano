import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../application/models/interface-product';
import { ProductsData } from '../../../config/service/constants';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { CartService, ITProduct } from '../../../services/cart.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})  
export class ItemPageComponent  {
  product: IProduct = ProductsData[0]
  products: IProduct[] = ProductsData 
  router = inject(Router)
  paramURL: string = ''
  seo = inject(SeoService)
  private cartService = inject(CartService)
  contact = '584140530043'
  whatsapp = `https://wa.me/${this.contact}?text=Hola%2C%20quiero%20más%20información%20sobre:%20`


  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.paramURL = params['codigo'] ?? ''
      if (this.paramURL) {
        const codigo = String(this.paramURL)
        this.product = ProductsData.find(p => p.codigo === codigo) ?? ProductsData[0]
      }
    })
  }

  addToCart(product: IProduct | null) {
    if (!product) return
    this.cartService.addProduct(product)
  }

  openWhatsApp() {
    const message = `• ${this.product.description} x1 - COD:${this.product.codigo}`
    const text = `${this.whatsapp}%0A${message}`
    window.open(text, '_blank')
  }

  openItem(item: IProduct) {
    console.log('navegar a item', item.codigo)
    this.router.navigate(['/item', item.codigo])
  }
}

