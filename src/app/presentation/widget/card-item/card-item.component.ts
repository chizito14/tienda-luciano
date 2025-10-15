import { Component, Input } from '@angular/core';
import { DataFiles } from '../../pages/products-page/products-page.component';
import { IProduct } from '../../../application/models/interface-product';

@Component({
  selector: 'card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {

  @Input()
  inputData: IProduct = DataFiles[0]

}
