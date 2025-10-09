import {
  Component,
  DestroyRef,
  DOCUMENT,
  Inject,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ToggleThemeComponent } from '@components/toggle-theme/toggle-theme.component';
import { ApiService } from '@core/services/api.service';
import { LanguageService } from '@core/services/language.service';
import { SelectTempService } from '@core/services/select-temp.service';

@Component({
  selector: 'app-settings',
  imports: [ToggleThemeComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private selectTempService = inject(SelectTempService);
  private languageService = inject(LanguageService);
  private destroyRef = inject(DestroyRef);
  protected defaultCity = signal('');
  protected currentWether = signal('');
  protected arrayTempMeasure = this.selectTempService.arrayTempMeasure;
  public selectedValue = this.selectTempService.selectedTemp();

  protected localList = signal([
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
  ]);
  protected chosenLang = this.languageService.language;

  constructor(
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.apiService
      .getUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.defaultCity.set(res.defaultCityName);
      });
  }
  changeEventSelector() {
    this.selectTempService.changeTemp(this.selectedValue);
  }
  changeLanguageSelector() {
    const lang = this.chosenLang();
    window.location.href = `/${lang}/settings`;
  }

  clickEventInputDefaultCity() {
    const defaultCity = this.defaultCity();
    if (defaultCity) {
      this.apiService
        .setDefaultCity(defaultCity)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
      this.apiService
        .fetchByCityName(defaultCity)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
  }
}
