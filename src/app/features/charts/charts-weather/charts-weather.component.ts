import {
  Component,
  effect,
  input,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { IForecastData } from 'app/shared/interfaces';
import { ChartOptions } from './model/chart-options';
import { SelectTempService } from '@core/services/select-temp.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-charts-weather',
  imports: [ChartComponent, FormsModule],
  templateUrl: './charts-weather.component.html',
  styleUrl: './charts-weather.component.scss',
})
export class ChartsWeatherComponent {
  @ViewChild('chart') chart!: ChartComponent;
  private selectTempService = inject(SelectTempService);
  private unitMeasurement = this.selectTempService.selectedTemp;
  public forecastData = input<IForecastData | undefined>(undefined);
  protected chartOptions!: ChartOptions;
  protected selectedValue = signal('temperature');

  constructor() {
    const today = new Date().toISOString().split('T')[0];
    effect(() => {
      const data = this.forecastData();
      if (data) {
        this.buildChartsByTemperature(data, today);
      }
    });
  }

  buildChartsByTemperature(data: IForecastData, today: string) {
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
  buildChartsByPrecipitation(data: IForecastData, today: string) {
    const todayWeather = data.list.filter((item) =>
      item.dt_txt.startsWith(today)
    );
    const dataSeries = todayWeather.map((item) => item.pop * 100);
    const dataLabels = todayWeather.map((item) => item.dt_txt);

    this.createCharts(dataSeries, dataLabels);
  }

  changeEventSelector() {
    const today = new Date().toISOString().split('T')[0];
    if (this.selectedValue() === 'temperature') {
      this.buildChartsByTemperature(this.forecastData()!, today);
    } else {
      this.buildChartsByPrecipitation(this.forecastData()!, today);
    }
  }

  createCharts(dataSeries: number[], dataLabels: string[]) {
    this.chartOptions = {
      series: [
        {
          name: $localize`Temperature`,
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
        text: $localize`5-Day Weather Forecast`,
        align: 'left',
      },
      subtitle: {
        text: $localize`Temperature trends (°${this.unitMeasurement()})`,
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
