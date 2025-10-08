import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() filtroCambiado = new EventEmitter<{
    titulo: string;
    precioMin: number | null;
    precioMax: number | null;
  }>();

  tituloFiltro = '';
  precioMin: number | null = null;
  precioMax: number | null = null;

  ngOnChanges() {
    this.emitirFiltro();
  }

  emitirFiltro() {
    this.filtroCambiado.emit({
      titulo: this.tituloFiltro,
      precioMin: this.precioMin,
      precioMax: this.precioMax
    });
  }

  limpiarFiltros() {
    this.tituloFiltro = '';
    this.precioMin = null;
    this.precioMax = null;
    this.emitirFiltro();
  }
}
