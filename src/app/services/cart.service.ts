// product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../application/models/interface-product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private productsSubject = new BehaviorSubject<IProduct[]>([]);
  products$ = this.productsSubject.asObservable();

  updateProducts(newProducts: IProduct[]) {
    this.productsSubject.next(newProducts);
  }

  addProduct(product: IProduct) {
    const current = this.productsSubject.getValue();
    this.productsSubject.next([...current, product]);
  }

  removeProduct(id: number) {
    const current = this.productsSubject.getValue();
    this.productsSubject.next(current.filter(p => p.id !== id));
  }
}
