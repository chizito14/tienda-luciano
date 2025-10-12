import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'products-page',
    standalone: true,
    imports: [
        RouterOutlet
    ],
    templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {}
