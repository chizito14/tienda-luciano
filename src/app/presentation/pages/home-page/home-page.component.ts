import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet
    ],
  template: '<h2>Hola Home Page</h2>',
})
export class HomePageComponent {}
