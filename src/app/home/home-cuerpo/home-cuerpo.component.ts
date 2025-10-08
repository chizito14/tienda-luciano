import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { Cuerpo2Component } from '../cuerpo-2/cuerpo-2.component';
import { CuerpoComponent } from '../cuerpo/cuerpo.component';
import { PopotBannerComponent } from '../../partes/popot-banner/popot-banner.component';
import { CarritoComponent } from '../../partes/carrito/carrito.component';

@Component({
  selector: 'app-home-cuerpo',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatIconModule,
    CuerpoComponent,
    Cuerpo2Component,
    FooterComponent,
    PopotBannerComponent,
    CarritoComponent
  ],
  templateUrl: './home-cuerpo.component.html',
  styleUrl: './home-cuerpo.component.scss'
})
export class HomeCuerpoComponent {


}