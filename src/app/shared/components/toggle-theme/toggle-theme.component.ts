import {
  Component,
  DOCUMENT,
  effect,
  inject,
  Inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-toggle-theme',
  imports: [FormsModule],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss',
})
export class ToggleThemeComponent {
  private themeService = inject(ThemeService);
  protected currentTheme = this.themeService.theme;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.body.setAttribute(
      'data-bs-theme',
      this.currentTheme() ? 'dark' : 'light'
    );
  }

  switchTheme(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.themeService.changeTheme(isChecked);

    this.document.body.setAttribute(
      'data-bs-theme',
      isChecked ? 'dark' : 'light'
    );
  }
}
