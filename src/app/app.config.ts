// Angular imports
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

// Import routes
import { routes } from './app.routes';

// Import environment configuration
import { environment } from '../environments/environment';

// Import recaptcha settings
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

// Import toastr
import { provideToastr } from 'ngx-toastr';

// Import ngx-translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

/**
 * Create translate loader
 * @param http - HttpClient
 * @returns - TranslateLoader
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * Application configuration file that sets up essential providers for the app.
 * It configures routing, HTTP client, animations, reCAPTCHA, toastr notifications, 
 * and ngx-translate for internationalization.
 * 
 * Features:
 * - Enables zone-based change detection optimization.
 * - Configures routing using predefined application routes.
 * - Provides hydration support with event replay for SSR compatibility.
 * - Sets up HTTP client to fetch data from the public folder.
 * - Configures ngx-toastr with custom styling and behavior.
 * - Integrates reCAPTCHA using environment variables for security.
 * - Sets up ngx-translate with a dynamic loader for language files.
 * 
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
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
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide    : TranslateLoader,
          useFactory : (createTranslateLoader),
          deps       : [HttpClient]
        },
      })
    )
  ]
};
