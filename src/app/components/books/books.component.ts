// Angular Imports
import { Component } from '@angular/core';

// CommonModule is required to use the ngIf, ngFor, ngClass, etc... directives
import { CommonModule } from '@angular/common';

// Import the TranslateModule from the @ngx-translate/core package
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-books',
  imports: [
    TranslateModule,
    CommonModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})

/**
 * Books component that displays a list of books with dropdown toggles.
 * Uses ngx-translate for multilingual support and CommonModule for structural directives.
 *
 * @author Samuel Osuna Muñoz <samuel.osunam@gmail.com>
 * @since 20250323
 * @version 1.0.0
 */
export class BooksComponent {

}
