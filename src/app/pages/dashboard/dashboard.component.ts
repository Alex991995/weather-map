import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { FormsModule } from '@angular/forms';
import { cities } from 'app/shared/constants';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  apiService = inject(ApiService);
  value = '';
  cities = signal(cities);

  ngOnInit() {
    // this.apiService.fetchByCityName('New York').subscribe((res) => {
    //   console.log(res);
    // });
  }
}
