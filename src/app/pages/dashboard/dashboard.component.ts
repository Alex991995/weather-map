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
import { IResponseCityById } from 'app/shared/interfaces';

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
  private arrayIDsFavCityUser = signal<number[]>([]);
  protected arrayIDsPopularCityByAdmin = signal<number[]>([]);
  protected arrayFavoriteCityUser = signal<IResponseCityById[]>([]);
  protected arrayPopularCityByAdmin = signal<IResponseCityById[]>([]);

  protected city = signal('');
  protected is_admin = signal(false);
  protected isCountryChecked = signal(false);
  protected isPopulationChecked = signal(false);
  protected cities = signal(arrayCities);

  constructor() {
    effect(() => {
      const arrayIDsFavCityUser = this.arrayIDsFavCityUser();
      if (arrayIDsFavCityUser.length) {
        this.apiService
          .getSetOfCitiesForecast(arrayIDsFavCityUser)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.arrayFavoriteCityUser.set(res);
          });
      }

      const arrayIDsPopularCityByAdmin = this.arrayIDsPopularCityByAdmin();
      if (arrayIDsFavCityUser.length) {
        this.apiService
          .getSetOfCitiesForecast(arrayIDsPopularCityByAdmin)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.arrayPopularCityByAdmin.set(res);
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const arrIDs = res.favoriteCities.map((c) => c.id_city);
        this.arrayIDsPopularCityByAdmin.set(arrIDs);
      });
  }

  changeEventInput() {
    this.router.navigate(['city', this.city()]);
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
