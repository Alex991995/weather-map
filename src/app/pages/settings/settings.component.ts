import { Component } from '@angular/core';
import { ToggleThemeComponent } from '@components/toggle-theme/toggle-theme.component';

@Component({
  selector: 'app-settings',
  imports: [ToggleThemeComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
