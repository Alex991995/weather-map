import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { arrayCities } from 'app/shared/constants';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private router = inject(Router);
  protected city = signal('');
  protected isCountryChecked = signal(false);
  protected isPopulationChecked = signal(false);
  protected cities = signal(arrayCities);

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
