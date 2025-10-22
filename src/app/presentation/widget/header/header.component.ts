import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { fadeScale } from '../../animations/fade-scale';
import { slideDown } from '../../animations/slide-down';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  animations: [
    fadeScale,
    slideDown('200ms')
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router)

  goWhere(url: string) {
    this.router.navigateByUrl(url)
  }
}
