// product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../application/models/interface-product';
import { ProductsData } from '../config/service/constants';

export interface ITProduct {
  product: IProduct
  quantity: number
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private productsSubject = new BehaviorSubject<ITProduct[]>([
    { product: ProductsData[0], quantity: 1 },
    { product: ProductsData[1], quantity: 2 }
  ]);
  products$ = this.productsSubject.asObservable();

  addProduct(product: IProduct) {
    const current = this.productsSubject.getValue();
    this.productsSubject.next([...current, {
      product: product,
      quantity: 1
    }]);
  }

  addUnit(product: ITProduct) {
    const current = this.productsSubject.getValue()
    const find = current.find( e => e.product.codigo == product.product.codigo )
    if (find) find.quantity += 1
  }

  delUnit(product: ITProduct) {
    const current = this.productsSubject.getValue()
    const find = current.find( e => e.product.codigo == product.product.codigo )
    if (find) {
      
      if (find.quantity == 1) this.removeProduct(product.product.codigo)
      find.quantity -= 1

    }
  }

  removeProduct(cod: string) {
    const current = this.productsSubject.getValue()
    this.productsSubject.next(current.filter(p => p.product.codigo !== cod))
  }
}
