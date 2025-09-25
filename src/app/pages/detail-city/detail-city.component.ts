import { DecimalPipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { ConvertTempPipe } from 'app/shared/pipes/convert-temp.pipe';
import {
  IForecastData,
  IForecastFor5Days,
  IWeatherInfo,
  Weather,
} from 'app/shared/interfaces';
import { ChartsWeatherComponent } from 'app/features/charts/charts-weather/charts-weather.component';
import { CardsForecastComponent } from 'app/features/forecast/cards-forecast/cards-forecast.component';
import { buildForecast } from './helper/build-forecast';

@Component({
  selector: 'app-detail-city',
  imports: [
    ConvertTempPipe,
    DecimalPipe,
    ChartsWeatherComponent,
    CardsForecastComponent,
  ],
  templateUrl: './detail-city.component.html',
  styleUrl: './detail-city.component.scss',
})
export class DetailCityComponent implements OnInit {
  private apiService = inject(ApiService);
  protected weatherInfo = signal<IWeatherInfo | undefined>(undefined);
  protected weatherCity = signal<Weather | undefined>(undefined);
  protected slug = input('');
  protected iconWeather = signal('');

  forecastFor5Days = signal<IForecastFor5Days[] | undefined>(undefined);
  forecastData = signal<IForecastData | undefined>(undefined);

  constructor() {
    effect(() => {
      const icon = this.weatherCity()?.icon;
      if (icon) {
        this.apiService.getIconWeather(icon).subscribe((buffer) => {
          const blob = new Blob([buffer], { type: 'image/png' });
          const imgURL = URL.createObjectURL(blob);

          this.iconWeather.set(imgURL);
        });
      }
    });
  }

  ngOnInit() {
    this.apiService.fetchByCityName(this.slug()).subscribe({
      next: (res) => {
        this.weatherInfo.set(res[0]);
        this.weatherCity.set(res[0].weather[0]);
      },
    });

    this.apiService.fetchForecastCity(this.slug()).subscribe((res) => {
      if (res) {
        const forecastFor5Days = buildForecast(res);
        this.forecastFor5Days.set(forecastFor5Days);
      }
      this.forecastData.set(res);
    });
  }
}
