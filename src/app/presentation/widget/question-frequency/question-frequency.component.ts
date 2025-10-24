import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../animations/animations';

@Component({
  selector: 'app-question-frequency',
  standalone: true,
  imports: [
    CommonModule
  ],
  animations: [
    fadeInOut
  ],
  templateUrl: './question-frequency.component.html',
  styleUrls: ['./question-frequency.component.scss']
})
export class QuestionFrequencyComponent {
  panels = [
    { mark: 'local_shipping', id: 'p4', title: '¿Envíos y tiempos de entrega?', open: false, content: 'Los envíos se realizan en 2-7 días hábiles según la ciudad y disponibilidad de stock.' },
    { mark: 'question_mark', id: 'p1', title: '¿Cómo realizo un pedido?', open: false, content: 'Para realizar un pedido debes... (ejemplo) completa el formulario, selecciona el método de pago y confirma.' },
    { mark: 'credit_card', id: 'p2', title: '¿Cuáles son los métodos de pago?', open: false, content: 'Aceptamos transferencia bancaria, pago en efectivo, y pagos con tarjetas a través de nuestra pasarela.' },
    { mark: 'undo', id: 'p3', title: '¿Cómo realizo una devolución?', open: false, content: 'Las devoluciones se realizan en un plazo de 14 días, contacta a soporte y te indicamos el proceso.' },
  ];

  position = 0
  selected = this.panels[this.position]

  next() {
    if ( this.position == this.panels.length - 1 ) {
      this.position = 0
      this.selected = this.panels[0]
    } else {
      this.position += 1
      this.selected = this.panels[this.position]
    }

  }
  
  previous() {
    if ( this.position == 0 ) {
      this.position = this.panels.length - 1
      this.selected = this.panels[this.position]
    } else {
      this.position -= 1
      this.selected = this.panels[this.position]
    }
  }

  toggle(id: string) {
    this.panels = this.panels.map(p => p.id === id ? { ...p, open: !p.open } : p);
  }

  // Cierra todos y abre solo uno (opcional)
  openOnly(id: string) {
    this.panels = this.panels.map(p => ({ ...p, open: p.id === id }));
  }
}
