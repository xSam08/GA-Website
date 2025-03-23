// Angular Imports
import { Component } from '@angular/core';

// Import the translate module from ngx-translate
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

/**
 * Footer component that provides multilingual support.
 * Uses ngx-translate for translations.
 *
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class FooterComponent {

}
