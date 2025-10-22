import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TabsComponent } from '../../widget/tabs/tabs.component';
import { QuestionFrequencyComponent } from '../../widget/question-frequency/question-frequency.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FormService } from '../../../services/gmail.service';
import { SeoService } from '../../../services/seo.service';
import { fadeScale } from '../../animations/fade-scale';
import { slideDown } from '../../animations/slide-down';
import { fadeIn } from '../../animations/fade-in';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabsComponent,
    QuestionFrequencyComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  animations: [
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
 
  seo = inject(SeoService)

  ngOnInit() {
    this.seo.title.setTitle('Repuesto de Vehiculos | LuciShop');
    this.seo.meta.updateTag({ name: 'description', content: 'Compra de respuestos de vehiculos con envío gratis y descuentos exclusivos.' });
    this.seo.setCanonicalURL('https://web-gyyu6m1m320a.up-de-fra1-k8s-1.apps.run-on-seenode.com/');
    this.seo.setIndexFollow(true)
  }

  private router: Router = inject(Router) 
  contactoForm: FormGroup
  enviando = false
  mensajeEstado = ''
  recaptchaToken = '' 

  goWhere(url: string) {
    this.router.navigateByUrl(url)

  }
  
  // Inyectar servicios
  private fb = inject(FormBuilder)
  private formService = inject(FormService)
  // For v2 checkbox we don't need ReCaptchaV3Service

  constructor() {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  // Handler called when the reCAPTCHA v2 checkbox is resolved by the user.
  onCaptchaResolved(token: string | null) {
    if (token) {
      this.recaptchaToken = token;
      console.log('reCAPTCHA v2 token generado');
    } else {
      this.recaptchaToken = '';
      console.warn('reCAPTCHA v2 no generó token');
    }
  }

  onSubmit() {
    if (this.contactoForm.valid && this.recaptchaToken && this.recaptchaToken !== 'error') {
      this.enviando = true
      this.mensajeEstado = ''

      const formData = {
        ...this.contactoForm.value,
        recaptchaToken: this.recaptchaToken
      }

      /*
        Using EmailJS: enviarFormulario returns an Observable wrapping the EmailJS promise.
        Typical successful response from EmailJS is an object like: { status: 200, text: 'OK' }
      */
      this.formService.enviarFormulario(formData)
        .subscribe({
          next: (response: any) => {
            this.enviando = false
            // EmailJS resolves with status 200 when successful
            if (response && response.status === 200) {
              this.mensajeEstado = '✅ Mensaje enviado correctamente'
              this.contactoForm.reset()
              // reset captcha token: user must resolve again if they want to submit
              this.recaptchaToken = '';
            } else {
              this.mensajeEstado = '❌ Error al enviar el mensaje'
              this.recaptchaToken = '';
            }
          },
          error: (error) => {
            this.enviando = false
            this.mensajeEstado = '❌ Error de conexión al enviar'
            console.error('Error:', error);
            this.recaptchaToken = '';
          }
        });
    } else {
      if (!this.recaptchaToken || this.recaptchaToken === 'error') {
        this.mensajeEstado = '❌ Error de seguridad. Marca el captcha antes de enviar.';
        this.recaptchaToken = '';
      }
      this.marcarCamposInvalidos();
    }
  }
  
   private marcarCamposInvalidos() {
    Object.keys(this.contactoForm.controls).forEach(key => {
      const control = this.contactoForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

}
