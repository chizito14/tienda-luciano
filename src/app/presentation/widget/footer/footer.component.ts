import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private router = inject(Router)

  goWhere(url: string) {
    // Abrir enlaces externos en una nueva pestaña (seguro) y mantener navegación interna con router
    try {
      if (/^https?:\/\//i.test(url)) {
        // 'noopener' evita que la página abierta acceda a window.opener
        window.open(url, '_blank', 'noopener');
        return;
      }
    } catch (e) {
      // En contextos SSR window puede no existir: caemos al router como fallback
    }
    this.router.navigateByUrl(url);
  }
}
