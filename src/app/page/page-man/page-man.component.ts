import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PopotBannerComponent } from '../../partes/popot-banner/popot-banner.component';
import { CardProductsComponent } from '../../partes/card-products/card-products.component';
import { listaDeRopa } from '../../config/data';
import { FilterComponent } from '../../partes/filter/filter.component';

@Component({
  selector: 'app-page-man',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    PopotBannerComponent,
    CardProductsComponent,
    FilterComponent
  ],
  templateUrl: './page-man.component.html',
  styleUrl: './page-man.component.scss'
})
export class PageManComponent {
  listaR = listaDeRopa;

  filtros: { titulo: string; precioMin: number | null; precioMax: number | null } = { titulo: '', precioMin: null, precioMax: null };
  
  aplicarFiltro(filtro: { titulo: string; precioMin: number | null; precioMax: number | null }) {
    this.filtros = filtro;
    console.log(filtro)
    this.listaR = listaDeRopa.filter(item => {
      const coincideTitulo = item.titulo.toLowerCase().includes(filtro.titulo.toLowerCase());
      const precio = parseFloat(item.precio);
      const min = filtro.precioMin ?? 0;
      const max = filtro.precioMax ?? Infinity;
      return coincideTitulo && precio >= min && precio <= max;
    });
  }
}
