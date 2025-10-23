import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  storageTheme = localStorage.getItem('theme') ?? 'false';
  theme = signal(JSON.parse(this.storageTheme));

  changeTheme(isChecked: boolean) {
    localStorage.setItem('theme', JSON.stringify(isChecked));
    this.theme.set(isChecked);
  }
}
