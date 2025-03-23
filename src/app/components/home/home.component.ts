// Import Angular core module
import { Component } from '@angular/core';

// Import the translate module from ngx-translate
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

/**
 * Home component representing the main landing page of the site.
 * Uses ngx-translate for multilingual support.
 *
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class HomeComponent {

}
