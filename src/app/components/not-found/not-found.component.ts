// Angular core module
import { Component } from '@angular/core';

// Import the rutes
import { RouterModule } from '@angular/router';

// Import the translate module
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterModule,
    TranslateModule
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})

/**
 * NotFound component that displays a custom 404 error page when users navigate to a non-existent route.
 * It provides multilingual support using ngx-translate and integrates with Angular's RouterModule for 
 * navigation.
 * The component ensures a user-friendly experience by guiding users back to available sections of 
 * the site.
 *
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class NotFoundComponent {

}
