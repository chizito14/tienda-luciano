import { Routes } from '@angular/router';
import { HomePageComponent } from './presentation/pages/home-page/home-page.component';
import { ProductsPageComponent } from './presentation/pages/products-page/products-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent 
  },
  {
    path: 'products',
    component: ProductsPageComponent 
  },
  {
    path: '**',
    redirectTo: '',
  }
];
