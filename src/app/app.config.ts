import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import  {RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),{
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LfBEO4rAAAAAFkPqye6ALKIJKbj_6qJaQuAoi-o',
      } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfBEO4rAAAAAFkPqye6ALKIJKbj_6qJaQuAoi-o'
    },
    provideHttpClient(withFetch())
   ]
};
