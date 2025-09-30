import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { List, City, IForecastData } from 'app/shared/interfaces';
import { ChartComponent } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexStroke,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { IDataForCharts } from './model/data-for-charts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis?: ApexYAxis;
};

@Component({
  selector: 'app-comparison',
  imports: [FormsModule, ChartComponent],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss',
})
export class ComparisonComponent {
  private apiService = inject(ApiService);
  @ViewChild('chart') chart!: ChartComponent;
  protected chartOptions!: ChartOptions;
  inputValue = signal('');
  rangeForecast = signal<string[]>(['today', 'for five days']);
  chosenRangeForecast = signal<'today' | 'for five days'>('today');
  arrayChosenCities = signal<string[]>(['london', 'moscow', 'minsk']);

  clickEventInputChoseCity() {
    const newCity = this.inputValue();
    if (newCity) {
      this.arrayChosenCities.update((prev) => [...prev, newCity]);
      this.inputValue.set('');
    }
  }
  deleteFromChosenCities(i: number) {
    const filteredArray = this.arrayChosenCities().filter(
      (item, index) => index !== i
    );
    this.arrayChosenCities.set(filteredArray);
  }

  createTodayDataForecastForCharts(res: IForecastData[]) {
    const today = new Date().toISOString().split('T')[0];

    const cityAndListForecast = res.map((item) => ({
      city: item.city,
      list: item.list.filter((c) => c.dt_txt.startsWith(today)),
    }));

    const dataForCharts: IDataForCharts[] = [];
    for (const element of cityAndListForecast) {
      const result = {
        name: element.city.name,
        data: element.list.map((item) => item.main.temp),
        categories: element.list.map((item) => item.dt_txt),
      };
      dataForCharts.push(result);
    }

    this.setCharts(dataForCharts);
  }

  createFor5daysDataForecastForCharts(res: IForecastData[]) {
    const cityAndListForecast: IDataForCharts[] = res.map((item) => ({
      name: item.city.name,
      data: item.list.map((item) => item.main.temp),
      categories: item.list.map((item) => item.dt_txt),
    }));
    this.setCharts(cityAndListForecast);
  }

  clickEventCompareWether() {
    const array = this.arrayChosenCities();
    this.apiService.fetchByArrayCityName(array).subscribe((res) => {
      if (this.chosenRangeForecast() === 'today') {
        this.createTodayDataForecastForCharts(res);
      } else {
        this.createFor5daysDataForecastForCharts(res);
      }
    });
  }

  setCharts(cityAndListForecast: IDataForCharts[]) {
    const c = cityAndListForecast[0].categories;

    const dateTime = c.map((d) => new Date(d.replace(' ', 'T')).toISOString());
    this.chartOptions = {
      series: cityAndListForecast,
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: dateTime,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }
}
