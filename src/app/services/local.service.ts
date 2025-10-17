import { isPlatformBrowser } from "@angular/common";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { ITProduct } from "./cart.service";

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get(): ITProduct[] {
    if (isPlatformBrowser(this.platformId)) {
      const find = localStorage.getItem('items')
      let result = find ? JSON.parse(find) : []
      return result
    }
    return []
  }

  set(value: ITProduct[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('items', JSON.stringify(value))
    }
  }
}
