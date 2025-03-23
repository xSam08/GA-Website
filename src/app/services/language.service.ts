// Import Angular core module
import { Injectable } from '@angular/core';

// Import the TranslateService from ngx-translate
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

/**
 * LanguageService handles language selection and persistence for the application.
 * It integrates with ngx-translate to provide dynamic translations and stores
 * the selected language in localStorage to maintain user preferences across sessions.
 * 
 * Features:
 * - Retrieves the saved language from localStorage or defaults to Spanish ('es').
 * - Allows dynamic language switching with ngx-translate.
 * - Persists the selected language to localStorage for future sessions.
 * - Provides a method to retrieve the current language setting.
 * 
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class LanguageService {

  // Variable to store the current language
  private currentLang: string = 'es';

  /**
   * Constructor of the service
   * @param translate - The translate service to use
   */
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('language');
    this.currentLang = savedLang ? savedLang : 'es';
    this.translate.use(this.currentLang);
  }

  /**
   * Function to change the language of the app
   * @param lang - The language to change to
   * @returns - Void
   */
  changeLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  /**
   * Function to get the current language
   * @returns - The current language
   */
  getCurrentLang(): string {
    return this.currentLang;
  }
}
