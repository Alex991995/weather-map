import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-detail-city',
  imports: [],
  templateUrl: './detail-city.component.html',
  styleUrl: './detail-city.component.scss',
})
export class DetailCityComponent implements OnInit {
  private apiService = inject(ApiService);
  slug = input('');

  ngOnInit() {
    this.apiService.fetchByCityName(this.slug()).subscribe((res) => {
      console.log(res[0].country);
    });
  }
}
