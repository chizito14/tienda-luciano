import { Component, inject, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BestSellerComponent } from '../../widget/best-seller/best-seller.component';
import { TabsComponent } from '../../widget/tabs/tabs.component';
import { QuestionFrequencyComponent } from '../../widget/question-frequency/question-frequency.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule, RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { FormService } from '../../../services/gmail.service';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
        CommonModule,
        RouterModule,
        RouterOutlet,
        BestSellerComponent,
        TabsComponent,
        QuestionFrequencyComponent,
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        RecaptchaV3Module,
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
    this.executeRecaptcha()
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
  private recaptchaService = inject(ReCaptchaV3Service)

  constructor() {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  executeRecaptcha() {
    this.recaptchaService.execute('contact_form')
      .subscribe({
        next: (token: string) => {
          this.recaptchaToken = token
          console.log('reCAPTCHA token generado')
        },
        error: (error) => {
          console.error('Error en reCAPTCHA:', error)
          this.recaptchaToken = 'error'
        }
      })
  }

  onSubmit() {
    if (this.contactoForm.valid && this.recaptchaToken && this.recaptchaToken !== 'error') {
      this.enviando = true
      this.mensajeEstado = ''

      const formData = {
        ...this.contactoForm.value,
        recaptchaToken: this.recaptchaToken
      }

      this.formService.enviarFormulario(formData)
        .subscribe({
          next: (response: any) => {
            this.enviando = false
            if (response.status === 'success') {
              this.mensajeEstado = '✅ Mensaje enviado correctamente'
              this.contactoForm.reset()
              this.executeRecaptcha()
            } else {
              this.mensajeEstado = '❌ ' + response.message
              this.executeRecaptcha()
            }
          },
          error: (error) => {
            this.enviando = false
            this.mensajeEstado = '❌ Error de conexión'
            console.error('Error:', error);
            this.executeRecaptcha();
          }
        });
    } else {
      if (!this.recaptchaToken || this.recaptchaToken === 'error') {
        this.mensajeEstado = '❌ Error de seguridad. Recarga la página.';
        this.executeRecaptcha();
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
