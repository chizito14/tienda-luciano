import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { fadeScale } from '../../animations/fade-scale';
import { slideDown } from '../../animations/slide-down';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  animations: [
    fadeScale,
    slideDown('200ms')
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router)
  showSubBot = true
  // control para menú móvil (botón bajo .sub-top)
  showMobileMenu = false

  ngOnInit(): void {
    this.updateShowSubBot()
  }

  @HostListener('window:resize')
  onResize() {
    this.updateShowSubBot()
  }

  private updateShowSubBot() {
    try {
      this.showSubBot = (window.innerWidth > 430)
    } catch (e) {
      this.showSubBot = true
    }
  }

  goWhere(url: string) {
    this.router.navigateByUrl(url)
    // cerrar menú móvil si está abierto (navegación desde móvil)
    this.showMobileMenu = false
  }

  // alterna el menú móvil (visible sólo bajo la media query móvil)
  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu
  }
}
