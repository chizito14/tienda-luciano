import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-frequency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-frequency.component.html',
  styleUrls: ['./question-frequency.component.scss']
})
export class QuestionFrequencyComponent {
  panels = [
    { id: 'p1', title: '¿Cómo realizo un pedido?', open: false, content: 'Para realizar un pedido debes... (ejemplo) completa el formulario, selecciona el método de pago y confirma.' },
    { id: 'p2', title: '¿Cuáles son los métodos de pago?', open: false, content: 'Aceptamos transferencia bancaria, pago en efectivo, y pagos con tarjetas a través de nuestra pasarela.' },
    { id: 'p3', title: '¿Cómo realizo una devolución?', open: false, content: 'Las devoluciones se realizan en un plazo de 14 días, contacta a soporte y te indicamos el proceso.' },
    { id: 'p4', title: '¿Envíos y tiempos de entrega?', open: false, content: 'Los envíos se realizan en 2-7 días hábiles según la ciudad y disponibilidad de stock.' }
  ];

  toggle(id: string) {
    this.panels = this.panels.map(p => p.id === id ? { ...p, open: !p.open } : p);
  }

  // Cierra todos y abre solo uno (opcional)
  openOnly(id: string) {
    this.panels = this.panels.map(p => ({ ...p, open: p.id === id }));
  }
}
