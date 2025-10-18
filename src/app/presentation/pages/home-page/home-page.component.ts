import { Component, inject, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BestSellerComponent } from '../../widget/best-seller/best-seller.component';
import { TabsComponent } from '../../widget/tabs/tabs.component';
import { QuestionFrequencyComponent } from '../../widget/question-frequency/question-frequency.component';
<<<<<<< HEAD
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule, RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { FormService } from '../../../services/gmail.service';
=======
import { FooterComponent } from '../../widget/footer/footer.component';
>>>>>>> a3a02f5d437421059950270e1e31945292d21e5d

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
<<<<<<< HEAD
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        RecaptchaV3Module,
=======
>>>>>>> a3a02f5d437421059950270e1e31945292d21e5d
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  ngOnInit() {
    this.executeRecaptcha();
  }

  private router: Router = inject(Router) 
  contactoForm: FormGroup;
  enviando = false;
  mensajeEstado = '';
  recaptchaToken = ''; 

  goWhere(url: string) {
    this.router.navigateByUrl(url)

  }
  
  // Inyectar servicios
  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private recaptchaService = inject(ReCaptchaV3Service);

  constructor() {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  executeRecaptcha() {
    this.recaptchaService.execute('contact_form')
      .subscribe({
        next: (token: string) => {
          this.recaptchaToken = token;
          console.log('reCAPTCHA token generado');
        },
        error: (error) => {
          console.error('Error en reCAPTCHA:', error);
          this.recaptchaToken = 'error';
        }
      });
  }

  onSubmit() {
    if (this.contactoForm.valid && this.recaptchaToken && this.recaptchaToken !== 'error') {
      this.enviando = true;
      this.mensajeEstado = '';

      const formData = {
        ...this.contactoForm.value,
        recaptchaToken: this.recaptchaToken
      };

      this.formService.enviarFormulario(formData)
        .subscribe({
          next: (response: any) => {
            this.enviando = false;
            if (response.status === 'success') {
              this.mensajeEstado = '✅ Mensaje enviado correctamente';
              this.contactoForm.reset();
              this.executeRecaptcha();
            } else {
              this.mensajeEstado = '❌ ' + response.message;
              this.executeRecaptcha();
            }
          },
          error: (error) => {
            this.enviando = false;
            this.mensajeEstado = '❌ Error de conexión';
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
