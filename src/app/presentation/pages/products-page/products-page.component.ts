import { Component } from '@angular/core';
import { CardItemComponent } from '../../widget/card-item/card-item.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
export class ProductsPageComponent {
    data: IProducts[] = DataFiles
    searchControl = new FormControl('')

    filterProducts() {
        console.log(this.searchControl)
        if (this.searchControl.value == '') {
            this.data = DataFiles
        } else {
            let num = (this.searchControl.value) ? Number.parseInt( (this.searchControl.value) ) : 0 
            this.data = this.data.filter( e => e.price == num )
        }
    }

}

export interface IProducts {
    name: string,
    price: number,
    image: string
}


export const DataFiles: IProducts[] = [
    {
        name: 'Violet Photo 1',
        price: 400,
        image: './../../../../assets/images/image1.jpg'
    },
    {
        name: 'Violet Photo 2',
        price: 1500,
        image: './../../../../assets/images/image2.jpg'
    },
    {
        name: 'Violet Wallpaper',
        price: 930,
        image: './../../../../assets/images/image3.jpg'
    },
        {
        name: 'Violet Photo 1',
        price: 400,
        image: './../../../../assets/images/image1.jpg'
    },
    {
        name: 'Violet Photo 2',
        price: 1500,
        image: './../../../../assets/images/image2.jpg'
    },
    {
        name: 'Violet Wallpaper',
        price: 930,
        image: './../../../../assets/images/image3.jpg'
    },
    {
        name: 'Violet Photo 1',
        price: 400,
        image: './../../../../assets/images/image1.jpg'
    },
    {
        name: 'Violet Photo 2',
        price: 1500,
        image: './../../../../assets/images/image2.jpg'
    },
    {
        name: 'Violet Wallpaper',
        price: 930,
        image: './../../../../assets/images/image3.jpg'
    },

]