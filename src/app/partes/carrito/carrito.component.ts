import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarritoBottomSheetComponent, CarritoItem } from './carrito-bottom-sheet/carrito-bottom-sheet.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatBottomSheetModule],
  template: `<button mat-fab color="accent" (click)="abrirCarrito()"><mat-icon>shopping_cart</mat-icon></button>`,
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  carrito: CarritoItem[] = [];

  constructor(private bottomSheet: MatBottomSheet) {}

  agregarProducto(producto: CarritoItem) {
    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += producto.cantidad;
    } else {
      this.carrito.push({ ...producto });
    }
  }

  abrirCarrito() {
    this.bottomSheet.open(CarritoBottomSheetComponent, {
      data: { items: this.carrito }
    });
  }
}