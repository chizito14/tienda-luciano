import { Component } from '@angular/core';
import { CardItemComponent } from '../../widget/card-item/card-item.component';

@Component({
    selector: 'products-page',
    standalone: true,
    imports: [
        CardItemComponent
    ],
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
    
    data: IProducts[] = DataFiles

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