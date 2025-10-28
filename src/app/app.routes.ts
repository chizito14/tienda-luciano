import { Routes } from '@angular/router';
import { HomePageComponent } from './presentation/pages/home-page/home-page.component';
import { ProductsPageComponent } from './presentation/pages/products-page/products-page.component';
import { CartPageComponent } from './presentation/pages/cart-page/cart-page.component';
import { ItemPageComponent } from './presentation/pages/item-page/item-page.component';
import { ContactComponent } from './presentation/pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent 
  },
  {
    path: 'products/:param',
    component: ProductsPageComponent 
  },
  {
    path: 'cart',
    component: CartPageComponent 
  },
  {
    path: 'item/:id',
    component: ItemPageComponent 
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];
