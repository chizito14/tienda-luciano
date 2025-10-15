import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./presentation/widget/header/header.component";
import { IProduct } from './application/models/interface-product';
import { ProductsData } from './config/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  whatsapp = 'https://wa.me/584124445555?text=Hola%2C%20quiero%20más%20información%20sobre:%20'
  
  cart: IProduct[] = [
    ProductsData[0],
    ProductsData[1],
  ]

  openWhatsApp() {
    const mensaje = this.cart.map(item =>
      `• ${item.description} x${item.cantidad} - COD:${item.codigo}`
    ).join('%0A'); 
    const textoFinal = `${this.whatsapp}%0A${mensaje}`;
    window.open(textoFinal, '_blank');
  }

}
