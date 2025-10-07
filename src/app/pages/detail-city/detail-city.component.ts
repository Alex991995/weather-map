import {
  Component,
  DestroyRef,
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
  IForecastForCard,
  IResponseCity,
} from 'app/shared/interfaces';
import { ChartsWeatherComponent } from 'app/features/charts/charts-weather/charts-weather.component';
import { CardsForecastComponent } from 'app/features/forecast/cards-forecast/cards-forecast.component';
import { buildForecast } from './helper/build-forecast';
import { RecommendationsComponent } from 'app/features/forecast/recommendations/recommendations.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-detail-city',
  imports: [
    ConvertTempPipe,
    ChartsWeatherComponent,
    CardsForecastComponent,
    RecommendationsComponent,
  ],
  templateUrl: './detail-city.component.html',
  styleUrl: './detail-city.component.scss',
})
export class DetailCityComponent implements OnInit {
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  // protected weatherInfo = signal<IWeatherInfo | undefined>(undefined);
  protected weatherCity = signal<IResponseCity | undefined>(undefined);
  protected slug = input('');
  protected iconWeather = signal('');
  isChosenAsFavorite = signal(false);

  forecastFor5Days = signal<IForecastForCard[] | undefined>(undefined);
  forecastData = signal<IForecastData | undefined>(undefined);

  constructor() {
    effect(() => {
      const icon = this.weatherCity()?.weather[0].icon;
      if (icon) {
        this.apiService.getIconWeather(icon).subscribe((buffer) => {
          const blob = new Blob([buffer], { type: 'image/png' });
          const imgURL = URL.createObjectURL(blob);

          this.iconWeather.set(imgURL);
        });
      }
      const weatherCity = this.weatherCity();

      if (weatherCity) {
        this.apiService
          .getAllFavCityIDUser()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            const findFavCity = res.favoriteCities.find(
              (c) => c.id_city === weatherCity.id
            );

            this.isChosenAsFavorite.set(!!findFavCity);
          });
      }
    });
  }

  get fillIfChosen() {
    const isChosenAsFavorite = this.isChosenAsFavorite();
    if (isChosenAsFavorite) {
      return 'bi bi-heart-fill fs-3 text-favorite';
    }
    return 'bi bi-heart fs-3 ';
  }

  ngOnInit() {
    this.apiService.fetchByCityName(this.slug()).subscribe({
      next: (res) => {
        console.log(res);
        this.weatherCity.set(res);
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

  clickEventAddToFavorite(id: number) {
    this.apiService.addFavoriteCityByID(id).subscribe((res) => {
      this.isChosenAsFavorite.set(res.is_added);
    });
  }
}
