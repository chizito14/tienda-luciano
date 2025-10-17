// services/form.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private http = inject(HttpClient);
  private scriptUrl = 'https://script.google.com/macros/s/AKfycbyq5s9Ch6nEHOaT7j39_0bCeKGMDmCaJKoMNjrQel_ol-w0PeSDdeFqrxWFs3h0C7qCww/exec';

  enviarFormulario(formData: any) {
    const params = new HttpParams({ fromObject: formData });
    
    return this.http.post(this.scriptUrl, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}