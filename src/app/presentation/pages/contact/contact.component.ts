import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormService } from '../../../services/gmail.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RecaptchaModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  router = Inject(RouterOutlet)
  // Formulario reactivo para la página de contacto
  contactoForm: FormGroup;
  enviando = false;
  mensajeEstado = '';
  // token reCAPTCHA (si el componente lo emite)
  private recaptchaToken = '';
  // key de ejemplo; reemplaza por la tuya si corresponde
  siteKey = '6Ld5gPIrAAAAAKg62mcM4tznchBwkXiAftNWlps8';

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializar el formulario con validaciones básicas
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(5)]],
      telefono: [''],
      recaptchaToken: ['']
    });
  }

  // Handler para cuando el reCAPTCHA devuelve el token
  onCaptchaResolved(token: any) {
    if (!isPlatformBrowser(this.platformId)) return; // seguridad SSR
    this.recaptchaToken = (typeof token === 'string') ? token : '';
    this.contactoForm.patchValue({ recaptchaToken: this.recaptchaToken });
  }

  // Envío del formulario usando FormService (EmailJS)
  onSubmit() {
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.mensajeEstado = '';

    this.formService.enviarFormulario(this.contactoForm.value).subscribe({
      next: (res) => {
        this.enviando = false;
        this.mensajeEstado = 'Mensaje enviado correctamente. Gracias por contactarnos.';
        this.contactoForm.reset();
      },
      error: (err) => {
        this.enviando = false;
        this.mensajeEstado = 'Error al enviar. Intenta de nuevo más tarde.';
        // console.error('Error al enviar formulario', err);
      }
    });
  }

}
