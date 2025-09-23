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
import { IForecastData, IWeatherInfo, Weather } from 'app/shared/interfaces';
import { ChartsWeatherComponent } from 'app/features/charts/charts-weather/charts-weather.component';

@Component({
  selector: 'app-detail-city',
  imports: [ConvertTempPipe, DecimalPipe, ChartsWeatherComponent],
  templateUrl: './detail-city.component.html',
  styleUrl: './detail-city.component.scss',
})
export class DetailCityComponent implements OnInit {
  private apiService = inject(ApiService);
  protected weatherInfo = signal<IWeatherInfo | undefined>(undefined);
  protected weatherCity = signal<Weather | undefined>(undefined);
  protected slug = input('');

  forecastData = computed(() => this.apiService.fetchForecastCity(this.slug()));

  iconWeather = signal('');

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

  // charts weather
  ngOnInit() {
    this.apiService.fetchByCityName(this.slug()).subscribe({
      next: (res) => {
        this.weatherInfo.set(res[0]);
        this.weatherCity.set(res[0].weather[0]);
      },
    });

    // this.apiService.fetchForecastCity(this.slug()).subscribe({
    //   next: (res) => {
    //     this.forecastData.set(res);
    //     console.log(this.forecastData());
    //   },
    // });

    // this.apiService
    //   .getIconWeather(this.weatherCity()!.icon)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
}

// name (название города)
// country (страна)
// weather[0].main и weather[0].description (состояние: "Mist / туман")
// weather[0].icon (иконка погоды)
// temp, temp_min, temp_max (температуры, но лучше сразу переводить из Кельвинов в °C)
// humidity (влажность)
// pressure (давление)
// wind.speed, wind.deg (ветер)
// clouds.all (облачность)
