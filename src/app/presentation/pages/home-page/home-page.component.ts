import { Component, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BestSellerComponent } from '../../widget/best-seller/best-seller.component';

@Component({
    selector: 'home-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        RouterOutlet,
        BestSellerComponent
    ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {

  private router: Router = inject(Router)  

  goWhere(url: string) {
    this.router.navigateByUrl(url)
  }

}
