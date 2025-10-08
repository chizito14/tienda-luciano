import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonsComponent } from './piezas/buttons/buttons.component';
import { SeachBtnComponent } from './piezas/seach-btn/seach-btn.component';
import { DropdownComponent } from './piezas/dropdown/dropdown.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonsComponent,
    SeachBtnComponent,
    DropdownComponent,
    FormsModule,
    RouterOutlet,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  link1() {
    throw new Error('Method not implemented.');
  }
  click() {
    throw new Error('Method not implemented.');
  }
  router=inject(Router)



}
