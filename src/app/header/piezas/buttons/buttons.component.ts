import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [RouterModule,
    
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent  {

}
