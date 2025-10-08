import { Component, ElementRef, Input, AfterViewInit, Renderer2 } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-popot-banner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './popot-banner.component.html',
  styleUrls: ['./popot-banner.component.scss']
})
export class PopotBannerComponent implements AfterViewInit {
  @Input() mainContainer!: HTMLElement;
  mostrarAnuncio = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.mainContainer) {
      this.mainContainer.addEventListener('scroll', () => this.adjustPopup());
      this.adjustPopup();
    }
  }

  adjustPopup() {
    const popup = this.el.nativeElement.querySelector('.popup-anuncio');
    const footer = document.querySelector('footer'); // Cambia el selector si tu footer es diferente
    if (!popup || !this.mainContainer || !footer) return;

    // Calcula la posición del borde inferior visible de .main
    const mainRect = this.mainContainer.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();

    // Si el borde inferior de .main toca o pasa el inicio del footer, oculta el popup
    if (mainRect.bottom >= footerRect.top) {
      this.mostrarAnuncio = false;
    } else {
      this.mostrarAnuncio = true;
      // Ajusta la posición normalmente
      const scrollBottom = this.mainContainer.scrollHeight - this.mainContainer.scrollTop - this.mainContainer.clientHeight;
      this.renderer.setStyle(popup, 'bottom', `${20 + scrollBottom}px`);
    }
  }

  onTituloClick() {
    alert('¡Título clickeado!');
  }
}

