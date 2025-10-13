import { Component, Input } from '@angular/core';
import { DataFiles, IProducts } from '../../pages/products-page/products-page.component';

@Component({
  selector: 'card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {

  @Input()
  inputData: IProducts = DataFiles[0]

}
