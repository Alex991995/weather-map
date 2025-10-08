import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { arrayCities } from 'app/shared/constants';
import { CardsComponent } from '@components/cards/cards.component';
import { ApiService } from '@core/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IForecastCityForCards } from 'app/shared/interfaces';
import { extractNecessaryFieldsForCards } from './helper/extract-necessary-fields-for-cards';
import { StoreLocallyHistoryReqService } from '@core/services/store-locally-history-req.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CardsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private storeLocallyHistoryReqService = inject(StoreLocallyHistoryReqService);
  private arrayIDsFavCityUser = signal<number[]>([]);
  protected arrayFavoriteCityUser = signal<IForecastCityForCards[]>([]);
  protected arrayPopularCityByAdmin = signal<IForecastCityForCards[]>([]);
  protected defaultCityOnDashboard = signal<IForecastCityForCards[]>([]);
  protected defaultCity = signal('');

  protected city = signal('');
  protected is_admin = signal(false);
  protected isCountryChecked = signal(false);
  protected isPopulationChecked = signal(false);
  protected isFavoriteCountryChecked = signal(false);
  protected isHottestCountryChecked = signal(false);
  protected cities = signal(arrayCities);

  onCheckboxFavoriteCountry() {
    const cloneData = [...this.arrayFavoriteCityUser()];
    const is_checked = this.isFavoriteCountryChecked();

    if (is_checked) {
      const res = cloneData.sort((a, b) =>
        a.country.localeCompare(b.country, undefined, { sensitivity: 'base' })
      );
      this.arrayFavoriteCityUser.set(res);
    } else {
      const res = cloneData.sort((a, b) =>
        b.country.localeCompare(a.country, undefined, { sensitivity: 'base' })
      );
      this.arrayFavoriteCityUser.set(res);
    }
  }
  onCheckboxHottestCountry() {
    const cloneData = [...this.arrayFavoriteCityUser()];
    const is_checked = this.isHottestCountryChecked();

    if (is_checked) {
      const res = cloneData.sort((a, b) => b.temp - a.temp);
      this.arrayFavoriteCityUser.set(res);
    } else {
      const res = cloneData.sort((a, b) => a.temp - b.temp);
      this.arrayFavoriteCityUser.set(res);
    }
  }

  constructor() {
    effect(() => {
      const arrayIDsFavCityUser = this.arrayIDsFavCityUser();
      if (arrayIDsFavCityUser.length) {
        this.apiService
          .getSetOfCitiesForecast(arrayIDsFavCityUser)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            const transformData = extractNecessaryFieldsForCards(res);
            this.arrayFavoriteCityUser.set(transformData);
          });
      }
      const defaultCity = this.defaultCity();
      if (defaultCity) {
        this.apiService
          .fetchByCityName(defaultCity)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            console.log(res);
            const transformData: IForecastCityForCards = {
              name: res.name,
              icon: res.weather[0].icon,
              temp: res.main.temp,
              humidity: res.main.humidity,
              pressure: res.main.pressure,
              description: res.weather[0].description,
              country: res.sys.country,
            };
            this.defaultCityOnDashboard.set([transformData]);
          });
      }
    });
  }

  ngOnInit() {
    this.apiService
      .getAllFavCityIDUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const arrIDs = res.favoriteCities.map((c) => c.id_city);
        this.is_admin.set(res.is_admin);
        this.arrayIDsFavCityUser.set(arrIDs);
      });

    this.apiService
      .getPopularIDCityByAdmin()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((res) => {
          const arrIDs = res.favoriteCities.map((c) => c.id_city);
          return this.apiService.getSetOfCitiesForecast(arrIDs);
        })
      )
      .subscribe((res) => {
        const transformData = extractNecessaryFieldsForCards(res);
        this.arrayPopularCityByAdmin.set(transformData);
      });

    this.apiService
      .getUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.defaultCity.set(res.defaultCityName);
      });
  }

  changeEventInput() {
    const city = this.city();
    if (city) {
      this.storeLocallyHistoryReqService.storeCity(city);
      this.router.navigate(['city', city]);
    }
  }

  onCheckboxCountryChange() {
    const stateCheckbox = this.isCountryChecked();
    this.isCountryChecked.set(!stateCheckbox);

    this.cities.update((prevCities) => {
      const copyCities = [...prevCities];
      return copyCities.sort((a, b) =>
        a.country.localeCompare(b.country, undefined, { sensitivity: 'base' })
      );
    });
  }
  onCheckboxPopulationChange() {
    const stateCheckbox = this.isPopulationChecked();
    this.isPopulationChecked.set(!stateCheckbox);

    this.cities.update((prevCities) => {
      const copyCities = [...prevCities];
      return copyCities.sort((a, b) => b.population - a.population);
    });
  }
}
