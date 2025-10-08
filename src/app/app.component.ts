import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';
import { CuerpoComponent } from './home/cuerpo/cuerpo.component';
import { Cuerpo2Component } from './home/cuerpo-2/cuerpo-2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
export class AppModule { }
