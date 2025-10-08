import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.scss'
})
export class CardProductsComponent {
  @Input() titulo = "";
  @Input() precio = "";
  @Input() preciodecimal = "";
  @Input() envio = "Envio gratis";
  @Input() img = "";
  @Input() img2?: "";

  hover = false;
}
