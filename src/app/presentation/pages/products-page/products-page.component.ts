import { Component, OnInit } from '@angular/core';
import { CardItemComponent } from '../../widget/card-item/card-item.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../application/models/interface-product';
import { ProductsData } from '../../../config/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'products-page',
    standalone: true,
    imports: [
        CardItemComponent,
        ReactiveFormsModule
    ],
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
    
    data: IProduct[] = ProductsData
    products: IProduct[] = ProductsData    
    inpSearch = new FormControl('')
    inpMin = new FormControl(null)
    inpMax = new FormControl(null)
    paramURL: string = ''

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.paramURL = params['param'] ?? ''
        });
        this.inpSearch.valueChanges.subscribe( e => this.filterProducts() )
    }

    filterPrice() {
        this.filterProducts()
        if (this.inpMax.value) {
            const value = this.inpMax.value 
            this.products = this.products.filter( p => value >= p.precio )
        }

        if (this.inpMin.value) {
            const value = this.inpMin.value 
            this.products = this.products.filter( p => value <= p.precio )
        }

    }

    filterProducts() {
        let temp = this.data
        if (!this.inpSearch.value) {
            this.products = ProductsData
        } else {
            const str = this.inpSearch.value.toLowerCase().trim()
            temp = temp.filter( p => p.description.toLowerCase().includes(str) )        
        }
        this.products = temp
    }
}
