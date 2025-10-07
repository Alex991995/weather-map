import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { IForecastData } from 'app/shared/interfaces';
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
import { SelectTempService } from '@core/services/select-temp.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis?: ApexYAxis;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-comparison',
  imports: [FormsModule, ChartComponent],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss',
})
export class ComparisonComponent {
  private apiService = inject(ApiService);
  private selectTempService = inject(SelectTempService);
  private unitMeasurement = this.selectTempService.selectedTemp;
  @ViewChild('chart') chart!: ChartComponent;
  protected chartOptions!: ChartOptions;
  protected inputValue = signal('');
  protected parameterSortForCharts = signal([
    { value: 'temp', label: $localize`:@@parameter.temp:temp` },
    { value: 'humidity', label: $localize`:@@parameter.humidity:humidity` },
    { value: 'wind', label: $localize`:@@parameter.wind:wind` },
  ]);
  protected chosenParameter = signal<'temp' | 'humidity' | 'wind'>('temp');
  protected rangeForecast = signal([
    { value: 'today', label: $localize`:@@parameter.today:today` },
    {
      value: 'for five days',
      label: $localize`:@@parameter.five:for five days`,
    },
  ]);

  protected chosenRangeForecast = signal<'today' | 'for five days'>('today');
  protected arrayChosenCities = signal<string[]>(['london', 'moscow', 'minsk']);

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

  createTodayDataForecastForCharts(
    res: IForecastData[],
    buildChartsBy: 'temp' | 'humidity' | 'wind'
  ) {
    const today = new Date().toISOString().split('T')[0];
    const cityAndListForecast = res.map((item) => ({
      city: item.city,
      list: item.list.filter((c) => c.dt_txt.startsWith(today)),
    }));
    const dataForCharts: IDataForCharts[] = [];
    if (buildChartsBy !== 'wind') {
      for (const element of cityAndListForecast) {
        const result = {
          name: element.city.name,
          data: element.list.map((item) => {
            if (buildChartsBy === 'temp') {
              return this.calculateUnitMeasurementTemp(item.main.temp);
            }
            return item.main.humidity;
          }),
          categories: element.list.map((item) => item.dt_txt),
        };
        dataForCharts.push(result);
      }
      this.setCharts(dataForCharts);
    } else {
      const dataForCharts: IDataForCharts[] = [];
      for (const element of cityAndListForecast) {
        const result = {
          name: element.city.name,
          data: element.list.map((item) => item.wind.speed),
          categories: element.list.map((item) => item.dt_txt),
        };
        dataForCharts.push(result);
      }
      this.setCharts(dataForCharts);
    }
  }

  createFor5daysDataForecastForCharts(
    res: IForecastData[],
    buildChartsBy: 'temp' | 'humidity' | 'wind'
  ) {
    if (buildChartsBy !== 'wind') {
      const cityAndListForecast: IDataForCharts[] = res.map((item) => ({
        name: item.city.name,
        data: item.list.map((item) => {
          if (buildChartsBy === 'temp') {
            return this.calculateUnitMeasurementTemp(item.main.temp);
          }
          return item.main.humidity;
        }),
        categories: item.list.map((item) => item.dt_txt),
      }));
      this.setCharts(cityAndListForecast);
    } else {
      const cityAndListForecast: IDataForCharts[] = res.map((item) => ({
        name: item.city.name,
        data: item.list.map((item) => item.wind.speed),
        categories: item.list.map((item) => item.dt_txt),
      }));
      this.setCharts(cityAndListForecast);
    }
  }

  calculateUnitMeasurementTemp(temp: number) {
    if (this.unitMeasurement() === 'C') {
      const res = temp - 273.15;
      return Math.floor(res);
    } else {
      let a = temp - 273.15;
      let res = a * 1.8 + 32;
      return Math.floor(res);
    }
  }

  clickEventCompareWether() {
    const chosenParameter = this.chosenParameter();
    const array = this.arrayChosenCities();
    this.apiService.fetchByArrayCityName(array).subscribe((res) => {
      if (this.chosenRangeForecast() === 'today') {
        this.createTodayDataForecastForCharts(res, chosenParameter);
      } else {
        this.createFor5daysDataForecastForCharts(res, chosenParameter);
      }
    });
  }
  get getTitleCharts() {
    const chosenParameter = this.chosenParameter();
    if (chosenParameter === 'humidity') {
      return `Humidity trends`;
    } else if (chosenParameter === 'temp') {
      return `Temperature trends (°${this.unitMeasurement()})`;
    } else {
      return `Wind trends`;
    }
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
      subtitle: {
        text: this.getTitleCharts,
        align: 'right',
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
