// product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../application/models/interface-product';
import { ProductsData } from '../config/service/constants';
import { StorageService } from './local.service';

export interface ITProduct {
  product: IProduct
  quantity: number
}

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor( private storage: StorageService ) {}

  private productsSubject = new BehaviorSubject<ITProduct[]>([]) 
  products$ = this.productsSubject.asObservable();

  initProducts() {
    const result = this.storage.get()
    this.productsSubject.next(result)
  }

  addProduct(product: IProduct) {
    const current = this.productsSubject.getValue()
    const result = current.find( e => e.product.codigo == product.codigo )
    
    if ( !result ) {
      this.productsSubject.next([...current, {
        product: product,
        quantity: 1
      }])
      this.setStorage()
    }
    
  }

  addUnit(product: ITProduct) {
    const current = this.productsSubject.getValue()
    const find = current.find( e => e.product.codigo == product.product.codigo )
    if (find) find.quantity += 1
    this.setStorage()
  }

  delUnit(product: ITProduct) {
    const current = this.productsSubject.getValue()
    const find = current.find( e => e.product.codigo == product.product.codigo )
    if (find) {
      if (find.quantity == 1) this.removeProduct(product.product.codigo)
      find.quantity -= 1
      this.setStorage()
    }
  }

  setStorage() {
    let newT = this.productsSubject.getValue()
    this.storage.set(newT)
  }

  removeProduct(cod: string) {
    const current = this.productsSubject.getValue()
    this.productsSubject.next(current.filter(p => p.product.codigo !== cod))
  }

  cleanProduct() {
    this.productsSubject.next([])
    this.setStorage()
  }
}
