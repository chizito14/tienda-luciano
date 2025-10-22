// services/form.service.ts
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { init, send } from '@emailjs/browser';

/*
  FormService (EmailJS)

  This service sends form data via EmailJS. Replace the SERVICE_ID, TEMPLATE_ID and PUBLIC_KEY
  with the values you get from your EmailJS account.

  Installation:
    npm install @emailjs/browser

  EmailJS template:
    - Create a template in EmailJS and use variable names like: from_name, reply_to, message, telefono, recaptchaToken
    - Map the template variables below in enviarFormulario(templateData)

  Security note:
    - EmailJS public key is safe to use in client-side code (it's the intended workflow), but do NOT
      commit private API credentials. Treat service IDs and template IDs as public identifiers.
*/
@Injectable({ providedIn: 'root' })
export class FormService {
  // TODO: replace these placeholders with your EmailJS values
  private SERVICE_ID = 'service_danodxx';
  private TEMPLATE_ID = 'template_ydgcc7o';
  private PUBLIC_KEY = 'kG_Dd-yKJIV-y8k9-';

  constructor() {
    // initialize EmailJS with your public key (no-op if placeholder)
    try {
      init(this.PUBLIC_KEY);
    } catch (e) {
      // Initialization may fail if placeholder is used; that's acceptable during development
      // console.warn('EmailJS init failed', e);
    }
  }

  /**
   * enviarFormulario
   * Accepts an object with form fields (e.g. { nombre, email, telefono, mensaje, recaptchaToken })
   * Maps them to the template parameters expected by EmailJS and returns an Observable.
   */
  enviarFormulario(formData: any): Observable<any> {
    const templateParams = {
      from_name: formData.nombre || '',
      reply_to: formData.email || '',
      telefono: formData.telefono || '',
      message: formData.mensaje || '',
      recaptchaToken: formData.recaptchaToken || ''
    };

    // send returns a Promise; wrap it with rxjs 'from' to return an Observable
    const promise = send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY);
    return from(promise);
  }
}