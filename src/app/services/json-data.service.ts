import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../application/models/interface-product';

@Injectable({ providedIn: 'root' })
export class JsonDataService {
  // Asegúrate que el archivo JSON está en `src/assets/data/deepseek_json_20251007_f5aa3a.json`
  private readonly url = './assets/Json.products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }
}
