import {
  AfterViewInit,
  Component,
  effect,
  input,
  ViewChild,
  inject,
} from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { IForecastData } from 'app/shared/interfaces';
import { ChartOptions } from './model/chart-options';
import { SelectTempService } from '@core/services/select-temp.service';

@Component({
  selector: 'app-charts-weather',
  imports: [ChartComponent],
  templateUrl: './charts-weather.component.html',
  styleUrl: './charts-weather.component.scss',
})
export class ChartsWeatherComponent {
  @ViewChild('chart') chart!: ChartComponent;
  private selectTempService = inject(SelectTempService);
  private unitMeasurement = this.selectTempService.selectedTemp;
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
        const dataSeries = todayWeather.map((item) => {
          if (this.unitMeasurement() === 'C') {
            const res = item.main.temp - 273.15;
            return Math.floor(res);
          } else {
            let a = item.main.temp - 273.15;
            let res = a * 1.8 + 32;
            return Math.floor(res);
          }
        });
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
        text: `Temperature trends (°${this.unitMeasurement()})`,
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
