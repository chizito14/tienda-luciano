import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-cuerpo-2',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './cuerpo-2.component.html',
  styleUrl: './cuerpo-2.component.scss'
})
export class Cuerpo2Component {
  router = inject(Router); // Inyecta Router

  rutaMen() {
    this.router.navigateByUrl("page-man")// Redirige a la ruta page
  }

}
