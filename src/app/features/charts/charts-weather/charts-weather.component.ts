import {
  AfterViewInit,
  Component,
  effect,
  input,
  ViewChild,
} from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { IForecastData } from 'app/shared/interfaces';
import { ChartOptions } from './model/chart-options';

@Component({
  selector: 'app-charts-weather',
  imports: [ChartComponent],
  templateUrl: './charts-weather.component.html',
  styleUrl: './charts-weather.component.scss',
})
export class ChartsWeatherComponent {
  @ViewChild('chart') chart!: ChartComponent;
  forecastData = input<IForecastData | undefined>(undefined);
  protected chartOptions!: ChartOptions;

  constructor() {
    const today = new Date().toISOString().split('T')[0];
    effect(() => {
      const data = this.forecastData();
      if (data) {
        const todayWeather = data.list.filter((item) =>
          item.dt_txt.startsWith(today)
        );
        const dataSeries = todayWeather.map((item) =>
          Math.floor(item.main.temp - 273.15)
        );
        const dataLabels = todayWeather.map((item) => item.dt_txt);

        this.createCharts(dataSeries, dataLabels);
      }
    });
  }

  createCharts(dataSeries: number[], dataLabels: string[]) {
    this.chartOptions = {
      series: [
        {
          name: 'Temperature',
          data: dataSeries,
        },
      ],
      chart: {
        type: 'area',
        height: 250,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: '5-Day Weather Forecast',
        align: 'left',
      },
      subtitle: {
        text: 'Temperature trends (°C)',
        align: 'left',
      },
      labels: dataLabels,
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: 'left',
      },
    };
  }
}
