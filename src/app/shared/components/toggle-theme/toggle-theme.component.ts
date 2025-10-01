import {
  Component,
  DOCUMENT,
  effect,
  Inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-toggle-theme',
  imports: [FormsModule],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss',
})
export class ToggleThemeComponent {
  currentTheme = signal(false);

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.body.setAttribute('data-bs-theme', 'light');
  }

  switchTheme(newTheme: boolean) {
    this.document.body.setAttribute(
      'data-bs-theme',
      newTheme ? 'dark' : 'light'
    );
    this.currentTheme.set(newTheme);
  }

  changeEventCheckbox() {
    const newTheme = this.currentTheme();
    this.switchTheme(newTheme);
  }
}
