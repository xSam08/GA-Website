// Import Angular core module
import { Injectable } from '@angular/core';

// Import the TranslateService from ngx-translate
import { TranslateService } from '@ngx-translate/core';

// Import BehaviorSubject and Observable from rxjs
import { BehaviorSubject, Observable  } from 'rxjs';

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
  private langSubject: BehaviorSubject<string>;

  /**
   * Constructor of the service
   * @param translate - The translate service to use
   */
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('language');
    this.currentLang = savedLang ? savedLang : 'es';
    this.translate.use(this.currentLang);
    this.langSubject = new BehaviorSubject<string>(this.currentLang);
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
    this.langSubject.next(lang);
  }

  /**
   * Function to get the current language
   * @returns - The current language
   */
  getCurrentLang(): string {
    return this.currentLang;
  }

  /**
   * Function to get the current language as an observable
   * @returns - An observable of the current language
   */
  get langChanged$(): Observable<string> {
    return this.langSubject.asObservable();
  }

  /**
   * Function to get translations for a list of keys
   * @param keys - The keys to get translations for
   * @return - An observable of the translations
   */
  getTranslations(keys: string[]): Observable<any> {
    return this.translate.get(keys);
  }
}
