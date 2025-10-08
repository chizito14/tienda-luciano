import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageManComponent } from './page/page-man/page-man.component';
import { HomeCuerpoComponent } from './home/home-cuerpo/home-cuerpo.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeCuerpoComponent // Ruta principal
  },
  {
    path: 'page-man',
    component: PageManComponent // Ruta para page-man
  }
];
