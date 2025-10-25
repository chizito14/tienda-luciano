import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  animations: [
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router)
  showSubBot = true
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
    this.showMobileMenu = false
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu
  }
}
