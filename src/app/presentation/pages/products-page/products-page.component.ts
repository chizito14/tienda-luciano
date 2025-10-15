import { Component, OnInit } from '@angular/core';
import { CardItemComponent } from '../../widget/card-item/card-item.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../application/models/interface-product';

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
    
    data: IProduct[] = DataFiles
    products: IProduct[] = DataFiles    
    inpSearch = new FormControl('')
    inpMin = new FormControl(null)
    inpMax = new FormControl(null)

    ngOnInit(): void {
        this.inpSearch.valueChanges.subscribe( e => this.filterProducts() )
        this.inpMin.valueChanges.subscribe( e => this.filterProducts() )
        this.inpMax.valueChanges.subscribe( e => this.filterProducts() )
    }
    
    filterProducts() {
        let temp = this.data

        if (!this.inpSearch.value) {
            this.products = DataFiles
        } else {
            const str = this.inpSearch.value.toLowerCase().trim()
            temp = temp.filter( p => p.description.toLowerCase().includes(str) )        
        }

        if (this.inpMax.value) {
            const value = this.inpMax.value 
            temp = temp.filter( p => value >= p.precio )
        }

        if (this.inpMin.value) {
            const value = this.inpMin.value 
            temp = temp.filter( p => value <= p.precio )
        }

        this.products = temp

    }

}

export const DataFiles: IProduct[] = [
    {
        description: 'Violet Photo 1',
        precio: 400,
        imagen: './../../../../assets/images/image1.jpg'
    },
    {
        description: 'Violet Photo 2',
        precio: 1500,
        imagen: './../../../../assets/images/image2.jpg'
    },
    {
        description: 'Violet Wallpaper',
        precio: 930,
        imagen: './../../../../assets/images/image3.jpg'
    },
        {
        description: 'Violet Photo 1',
        precio: 400,
        imagen: './../../../../assets/images/image1.jpg'
    },
    {
        description: 'Violet Photo 2',
        precio: 1500,
        imagen: './../../../../assets/images/image2.jpg'
    },
    {
        description: 'Violet Wallpaper',
        precio: 930,
        imagen: './../../../../assets/images/image3.jpg'
    },
    {
        description: 'Violet Photo 1',
        precio: 400,
        imagen: './../../../../assets/images/image1.jpg'
    },
    {
        description: 'Violet Photo 2',
        precio: 1500,
        imagen: './../../../../assets/images/image2.jpg'
    },
    {
        description: 'Violet Wallpaper',
        precio: 930,
        imagen: './../../../../assets/images/image3.jpg'
    },

]