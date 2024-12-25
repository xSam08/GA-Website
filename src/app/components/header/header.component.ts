import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public lang: string = 'es';
  public isDropdownVisible: boolean = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  changeLang(event: MouseEvent) {
    event.stopPropagation();
    this.lang = this.lang === 'es' ? 'en' : 'es';
    this.isDropdownVisible = false;
  }
}
