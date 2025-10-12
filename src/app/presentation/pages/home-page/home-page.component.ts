import { Component, inject } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'home-page',
    standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  private router: Router = inject(Router)  

  goWhere(url: string) {
    this.router.navigateByUrl(url)
  }

}
