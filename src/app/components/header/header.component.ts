import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  lang = 'es';

  changeLang() {
    this.lang === 'es' ? this.lang = 'en' : this.lang = 'es';
  }
}
