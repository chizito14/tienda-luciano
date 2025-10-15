import { Component, Input } from '@angular/core';
import { IProduct } from '../../../application/models/interface-product';
import { ProductsData } from '../../../config/constants';

@Component({
  selector: 'card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {

  @Input()
  inputData: IProduct = ProductsData[0]

}
