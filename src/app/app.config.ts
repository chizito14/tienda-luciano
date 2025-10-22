import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import  {RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),{
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ld5gPIrAAAAAKg62mcM4tznchBwkXiAftNWlps8',
      } as RecaptchaSettings,
    },
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule)
   ]
};
