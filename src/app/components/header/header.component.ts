// Import Angular modules
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// Import the language service and the translate module
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

/**
 * Header component that provides navigation and language selection functionality.
 * Uses RouterModule for routing and ngx-translate for translations.
 * Implements a dropdown menu for language switching via LanguageService.
 *
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class HeaderComponent {

  // Declaration of the variables
  public isDropdownVisible: boolean = false;
  public lang: string;

  /**
   * Constructor of the component
   * @param languageService - The language service to use
   */
  constructor(private languageService: LanguageService) {
    this.lang = languageService.getCurrentLang();
  }

  /**
   * Function to toggle the dropdown visibility
   * @returns void
   */
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  /**
   * Function to change the language of the site
   * @param event - The click event
   * @returns void
   */
  changeLang(event: MouseEvent): void {
    event.stopPropagation();
    this.lang = this.lang === 'es' ? 'en' : 'es';
    this.languageService.changeLang(this.lang);
    this.isDropdownVisible = false;
  }
}
