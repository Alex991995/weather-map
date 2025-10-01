import {
  Component,
  DestroyRef,
  DOCUMENT,
  Inject,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleThemeComponent } from '@components/toggle-theme/toggle-theme.component';
import { ApiService } from '@core/services/api.service';
import { SelectTempService } from '@core/services/select-temp.service';

@Component({
  selector: 'app-settings',
  imports: [ToggleThemeComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private selectTempService = inject(SelectTempService);
  private destroyRef = inject(DestroyRef);
  protected defaultCity = signal('');
  currentWether = signal('');

  protected arrayTempMeasure = this.selectTempService.arrayTempMeasure;
  public selectedValue = this.selectTempService.selectedTemp();

  constructor(
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.apiService.getUser().subscribe((res) => {
      this.defaultCity.set(res.defaultCityName);
      console.log(res);
    });
  }

  changeEventSelector() {
    this.selectTempService.changeTemp(this.selectedValue);
  }

  clickEventInputDefaultCity() {
    const defaultCity = this.defaultCity();
    if (defaultCity) {
      this.apiService.setDefaultCity(defaultCity).subscribe((res) => {
        console.log(res);
      });

      this.apiService.fetchByCityName(defaultCity).subscribe((res) => {
        const firstCity = res[0];
        const currentWether = firstCity.weather[0].main;
        const weatherClass = this.getWeatherClass(currentWether);
        document.body.classList.remove(
          'weather-clear',
          'weather-rain',
          'weather-clouds',
          'weather-snow'
        );

        this.document.body.classList.add(weatherClass);
        this.currentWether.set(currentWether);
      });
    }
  }
  private getWeatherClass(weather: string): string {
    switch (weather) {
      case 'Rain':
        return 'weather-rain';
      case 'Clear':
        return 'weather-clear';
      case 'Snow':
        return 'weather-snow';
      case 'Clouds':
        return 'weather-clouds';
      default:
        return 'weather-clear';
    }
  }
}
