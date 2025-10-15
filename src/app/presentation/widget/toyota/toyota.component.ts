import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BestSellerComponent } from '../best-seller/best-seller.component';

@Component({
  selector: 'app-toyota',
  standalone: true,
  imports: [CommonModule,BestSellerComponent],
  templateUrl: './toyota.component.html',
  styleUrls: ['./toyota.component.scss']
})
export class ToyotaComponent {

}
