import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Import environment
import { environment } from '../environments/environment';

// Import recaptcha settings
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

// Import toastr
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 10000,
      closeButton: true,
      progressBar: true,
    }),
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    }
  ]
};
