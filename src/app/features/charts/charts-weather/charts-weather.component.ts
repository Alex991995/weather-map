import {
  AfterViewInit,
  Component,
  input,
  OnInit,
  Signal,
  ViewChild,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { IForecastData } from 'app/shared/interfaces';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';
import { Observable } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

// type chartOptions = Partial<ChartOptions>;

@Component({
  selector: 'app-charts-weather',
  imports: [ChartComponent],
  templateUrl: './charts-weather.component.html',
  styleUrl: './charts-weather.component.scss',
})
export class ChartsWeatherComponent implements OnInit, AfterViewInit {
  // forecastData = input<WritableSignal<IForecastData | undefined>>();
  forecastData = input<Signal<Observable<IForecastData>>>();
  // chart = viewChild.required<ChartComponent>('chart');
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  ngOnInit(): void {}

  // constructor() {
  //   // this.chartOptions = {
  //   //   series: [
  //   //     {
  //   //       name: 'STOCK ABC',
  //   //       data: series.monthDataSeries1.prices,
  //   //     },
  //   //   ],
  //   //   chart: {
  //   //     type: 'area',
  //   //     height: 350,
  //   //     zoom: {
  //   //       enabled: false,
  //   //     },
  //   //   },
  //   //   dataLabels: {
  //   //     enabled: false,
  //   //   },
  //   //   stroke: {
  //   //     curve: 'straight',
  //   //   },
  //   //   title: {
  //   //     text: 'Fundamental Analysis of Stocks',
  //   //     align: 'left',
  //   //   },
  //   //   subtitle: {
  //   //     text: 'Price Movements',
  //   //     align: 'left',
  //   //   },
  //   //   labels: series.monthDataSeries1.dates,
  //   //   xaxis: {
  //   //     type: 'datetime',
  //   //   },
  //   //   yaxis: {
  //   //     opposite: true,
  //   //   },
  //   //   legend: {
  //   //     horizontalAlign: 'left',
  //   //   },
  //   // };
  // }

  ngAfterViewInit(): void {
    this.forecastData()?.().subscribe((res) => {
      const dataSeries = res.list.map((item) =>
        Math.floor(item.main.temp - 273.15)
      );
      const dataLabels = res.list.map((item) => item.dt_txt);
      this.chartOptions = {
        series: [
          {
            name: 'Temperature',
            data: dataSeries,
          },
        ],
        chart: {
          type: 'area',
          height: 350,
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
    });
  }
}

// export const series = {
//   cod: '200',
//   message: 0,
//   cnt: 40,
//   list: [
//     {
//       dt: 1758628800,
//       main: {
//         temp: 301.66,
//         feels_like: 306.19,
//         temp_min: 300.71,
//         temp_max: 301.66,
//         pressure: 1009,
//         sea_level: 1009,
//         grnd_level: 1007,
//         humidity: 78,
//         temp_kf: 0.95,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 83,
//       },
//       wind: {
//         speed: 5.21,
//         deg: 253,
//         gust: 5.61,
//       },
//       visibility: 10000,
//       pop: 0.88,
//       rain: {
//         '3h': 0.47,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-23 12:00:00',
//     },
//     {
//       dt: 1758639600,
//       main: {
//         temp: 301.09,
//         feels_like: 304.66,
//         temp_min: 300.56,
//         temp_max: 301.09,
//         pressure: 1010,
//         sea_level: 1010,
//         grnd_level: 1009,
//         humidity: 77,
//         temp_kf: 0.53,
//       },
//       weather: [
//         {
//           id: 803,
//           main: 'Clouds',
//           description: 'broken clouds',
//           icon: '04n',
//         },
//       ],
//       clouds: {
//         all: 80,
//       },
//       wind: {
//         speed: 5.37,
//         deg: 256,
//         gust: 5.94,
//       },
//       visibility: 10000,
//       pop: 0,
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-23 15:00:00',
//     },
//     {
//       dt: 1758650400,
//       main: {
//         temp: 300.39,
//         feels_like: 303.22,
//         temp_min: 300.39,
//         temp_max: 300.39,
//         pressure: 1010,
//         sea_level: 1010,
//         grnd_level: 1009,
//         humidity: 78,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 804,
//           main: 'Clouds',
//           description: 'overcast clouds',
//           icon: '04n',
//         },
//       ],
//       clouds: {
//         all: 91,
//       },
//       wind: {
//         speed: 4.78,
//         deg: 256,
//         gust: 5.3,
//       },
//       visibility: 10000,
//       pop: 0,
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-23 18:00:00',
//     },
//     {
//       dt: 1758661200,
//       main: {
//         temp: 300.06,
//         feels_like: 302.52,
//         temp_min: 300.06,
//         temp_max: 300.06,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1007,
//         humidity: 78,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 77,
//       },
//       wind: {
//         speed: 3.82,
//         deg: 255,
//         gust: 4.19,
//       },
//       visibility: 10000,
//       pop: 0.2,
//       rain: {
//         '3h': 0.1,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-23 21:00:00',
//     },
//     {
//       dt: 1758672000,
//       main: {
//         temp: 299.83,
//         feels_like: 302.12,
//         temp_min: 299.83,
//         temp_max: 299.83,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1007,
//         humidity: 79,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 53,
//       },
//       wind: {
//         speed: 2.61,
//         deg: 241,
//         gust: 2.86,
//       },
//       visibility: 10000,
//       pop: 0.2,
//       rain: {
//         '3h': 0.1,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-24 00:00:00',
//     },
//     {
//       dt: 1758682800,
//       main: {
//         temp: 300.07,
//         feels_like: 302.54,
//         temp_min: 300.07,
//         temp_max: 300.07,
//         pressure: 1010,
//         sea_level: 1010,
//         grnd_level: 1009,
//         humidity: 78,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 21,
//       },
//       wind: {
//         speed: 2.26,
//         deg: 198,
//         gust: 2.43,
//       },
//       visibility: 10000,
//       pop: 0.87,
//       rain: {
//         '3h': 0.36,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-24 03:00:00',
//     },
//     {
//       dt: 1758693600,
//       main: {
//         temp: 300.8,
//         feels_like: 303.63,
//         temp_min: 300.8,
//         temp_max: 300.8,
//         pressure: 1010,
//         sea_level: 1010,
//         grnd_level: 1009,
//         humidity: 74,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 15,
//       },
//       wind: {
//         speed: 4.61,
//         deg: 195,
//         gust: 4.47,
//       },
//       visibility: 10000,
//       pop: 0.87,
//       rain: {
//         '3h': 0.37,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-24 06:00:00',
//     },
//     {
//       dt: 1758704400,
//       main: {
//         temp: 301.06,
//         feels_like: 304.17,
//         temp_min: 301.06,
//         temp_max: 301.06,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1006,
//         humidity: 74,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 4,
//       },
//       wind: {
//         speed: 5.25,
//         deg: 235,
//         gust: 5.52,
//       },
//       visibility: 10000,
//       pop: 0.71,
//       rain: {
//         '3h': 0.51,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-24 09:00:00',
//     },
//     {
//       dt: 1758715200,
//       main: {
//         temp: 301,
//         feels_like: 304.31,
//         temp_min: 301,
//         temp_max: 301,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1006,
//         humidity: 76,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 800,
//           main: 'Clear',
//           description: 'clear sky',
//           icon: '01d',
//         },
//       ],
//       clouds: {
//         all: 7,
//       },
//       wind: {
//         speed: 5.27,
//         deg: 235,
//         gust: 5.58,
//       },
//       visibility: 10000,
//       pop: 0.54,
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-24 12:00:00',
//     },
//     {
//       dt: 1758726000,
//       main: {
//         temp: 300.29,
//         feels_like: 303.2,
//         temp_min: 300.29,
//         temp_max: 300.29,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1008,
//         humidity: 80,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 8,
//       },
//       wind: {
//         speed: 4.81,
//         deg: 217,
//         gust: 5.77,
//       },
//       visibility: 10000,
//       pop: 0.99,
//       rain: {
//         '3h': 0.83,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-24 15:00:00',
//     },
//     {
//       dt: 1758736800,
//       main: {
//         temp: 299.97,
//         feels_like: 302.66,
//         temp_min: 299.97,
//         temp_max: 299.97,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1008,
//         humidity: 82,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 9,
//       },
//       wind: {
//         speed: 4.26,
//         deg: 209,
//         gust: 5.08,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 2.85,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-24 18:00:00',
//     },
//     {
//       dt: 1758747600,
//       main: {
//         temp: 299.83,
//         feels_like: 302.2,
//         temp_min: 299.83,
//         temp_max: 299.83,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1006,
//         humidity: 80,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 24,
//       },
//       wind: {
//         speed: 2.93,
//         deg: 202,
//         gust: 3.38,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 1.16,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-24 21:00:00',
//     },
//     {
//       dt: 1758758400,
//       main: {
//         temp: 299.33,
//         feels_like: 299.33,
//         temp_min: 299.33,
//         temp_max: 299.33,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1006,
//         humidity: 82,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 21,
//       },
//       wind: {
//         speed: 3.09,
//         deg: 170,
//         gust: 3.13,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 0.37,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-25 00:00:00',
//     },
//     {
//       dt: 1758769200,
//       main: {
//         temp: 298.93,
//         feels_like: 299.78,
//         temp_min: 298.93,
//         temp_max: 298.93,
//         pressure: 1009,
//         sea_level: 1009,
//         grnd_level: 1009,
//         humidity: 85,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 28,
//       },
//       wind: {
//         speed: 4,
//         deg: 144,
//         gust: 3.76,
//       },
//       visibility: 10000,
//       pop: 0.57,
//       rain: {
//         '3h': 0.37,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-25 03:00:00',
//     },
//     {
//       dt: 1758780000,
//       main: {
//         temp: 300.12,
//         feels_like: 302.73,
//         temp_min: 300.12,
//         temp_max: 300.12,
//         pressure: 1009,
//         sea_level: 1009,
//         grnd_level: 1009,
//         humidity: 79,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 17,
//       },
//       wind: {
//         speed: 3.76,
//         deg: 181,
//         gust: 3.82,
//       },
//       visibility: 10000,
//       pop: 0.31,
//       rain: {
//         '3h': 0.21,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-25 06:00:00',
//     },
//     {
//       dt: 1758790800,
//       main: {
//         temp: 300.86,
//         feels_like: 303.88,
//         temp_min: 300.86,
//         temp_max: 300.86,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1006,
//         humidity: 75,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 40,
//       },
//       wind: {
//         speed: 4.92,
//         deg: 219,
//         gust: 4.63,
//       },
//       visibility: 10000,
//       pop: 0.33,
//       rain: {
//         '3h': 0.22,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-25 09:00:00',
//     },
//     {
//       dt: 1758801600,
//       main: {
//         temp: 301.17,
//         feels_like: 304.55,
//         temp_min: 301.17,
//         temp_max: 301.17,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1006,
//         humidity: 75,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 20,
//       },
//       wind: {
//         speed: 4.35,
//         deg: 248,
//         gust: 4.73,
//       },
//       visibility: 10000,
//       pop: 0.21,
//       rain: {
//         '3h': 0.15,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-25 12:00:00',
//     },
//     {
//       dt: 1758812400,
//       main: {
//         temp: 300.42,
//         feels_like: 303.5,
//         temp_min: 300.42,
//         temp_max: 300.42,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1007,
//         humidity: 80,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 501,
//           main: 'Rain',
//           description: 'moderate rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 3,
//       },
//       wind: {
//         speed: 3.59,
//         deg: 248,
//         gust: 4.08,
//       },
//       visibility: 5490,
//       pop: 1,
//       rain: {
//         '3h': 3.11,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-25 15:00:00',
//     },
//     {
//       dt: 1758823200,
//       main: {
//         temp: 300.26,
//         feels_like: 303.04,
//         temp_min: 300.26,
//         temp_max: 300.26,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1008,
//         humidity: 79,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 5,
//       },
//       wind: {
//         speed: 3.33,
//         deg: 217,
//         gust: 3.54,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 2.63,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-25 18:00:00',
//     },
//     {
//       dt: 1758834000,
//       main: {
//         temp: 299.95,
//         feels_like: 302.45,
//         temp_min: 299.95,
//         temp_max: 299.95,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1006,
//         humidity: 80,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 22,
//       },
//       wind: {
//         speed: 3.14,
//         deg: 203,
//         gust: 3.35,
//       },
//       visibility: 10000,
//       pop: 0.68,
//       rain: {
//         '3h': 0.57,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-25 21:00:00',
//     },
//     {
//       dt: 1758844800,
//       main: {
//         temp: 299.54,
//         feels_like: 299.54,
//         temp_min: 299.54,
//         temp_max: 299.54,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1006,
//         humidity: 82,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 35,
//       },
//       wind: {
//         speed: 2.43,
//         deg: 172,
//         gust: 2.46,
//       },
//       visibility: 10000,
//       pop: 0.61,
//       rain: {
//         '3h': 0.27,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-26 00:00:00',
//     },
//     {
//       dt: 1758855600,
//       main: {
//         temp: 299.17,
//         feels_like: 299.17,
//         temp_min: 299.17,
//         temp_max: 299.17,
//         pressure: 1009,
//         sea_level: 1009,
//         grnd_level: 1008,
//         humidity: 85,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 48,
//       },
//       wind: {
//         speed: 2.83,
//         deg: 141,
//         gust: 2.33,
//       },
//       visibility: 10000,
//       pop: 0.25,
//       rain: {
//         '3h': 0.13,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-26 03:00:00',
//     },
//     {
//       dt: 1758866400,
//       main: {
//         temp: 299.93,
//         feels_like: 302.49,
//         temp_min: 299.93,
//         temp_max: 299.93,
//         pressure: 1009,
//         sea_level: 1009,
//         grnd_level: 1008,
//         humidity: 81,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 802,
//           main: 'Clouds',
//           description: 'scattered clouds',
//           icon: '03d',
//         },
//       ],
//       clouds: {
//         all: 42,
//       },
//       wind: {
//         speed: 2.77,
//         deg: 199,
//         gust: 2.36,
//       },
//       visibility: 10000,
//       pop: 0,
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-26 06:00:00',
//     },
//     {
//       dt: 1758877200,
//       main: {
//         temp: 300.73,
//         feels_like: 303.85,
//         temp_min: 300.73,
//         temp_max: 300.73,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1006,
//         humidity: 77,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 803,
//           main: 'Clouds',
//           description: 'broken clouds',
//           icon: '04d',
//         },
//       ],
//       clouds: {
//         all: 52,
//       },
//       wind: {
//         speed: 3.38,
//         deg: 246,
//         gust: 2.98,
//       },
//       visibility: 10000,
//       pop: 0.2,
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-26 09:00:00',
//     },
//     {
//       dt: 1758888000,
//       main: {
//         temp: 301.13,
//         feels_like: 304.18,
//         temp_min: 301.13,
//         temp_max: 301.13,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1005,
//         humidity: 73,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 802,
//           main: 'Clouds',
//           description: 'scattered clouds',
//           icon: '03d',
//         },
//       ],
//       clouds: {
//         all: 42,
//       },
//       wind: {
//         speed: 3.26,
//         deg: 271,
//         gust: 3.43,
//       },
//       visibility: 10000,
//       pop: 0.13,
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-26 12:00:00',
//     },
//     {
//       dt: 1758898800,
//       main: {
//         temp: 301,
//         feels_like: 304.04,
//         temp_min: 301,
//         temp_max: 301,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1007,
//         humidity: 74,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 804,
//           main: 'Clouds',
//           description: 'overcast clouds',
//           icon: '04n',
//         },
//       ],
//       clouds: {
//         all: 87,
//       },
//       wind: {
//         speed: 0.91,
//         deg: 286,
//         gust: 1.35,
//       },
//       visibility: 10000,
//       pop: 0,
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-26 15:00:00',
//     },
//     {
//       dt: 1758909600,
//       main: {
//         temp: 300.36,
//         feels_like: 303.15,
//         temp_min: 300.36,
//         temp_max: 300.36,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1007,
//         humidity: 78,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 93,
//       },
//       wind: {
//         speed: 2.53,
//         deg: 173,
//         gust: 2.18,
//       },
//       visibility: 10000,
//       pop: 0.2,
//       rain: {
//         '3h': 0.17,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-26 18:00:00',
//     },
//     {
//       dt: 1758920400,
//       main: {
//         temp: 299.68,
//         feels_like: 299.68,
//         temp_min: 299.68,
//         temp_max: 299.68,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1005,
//         humidity: 81,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 3.03,
//         deg: 183,
//         gust: 2.88,
//       },
//       visibility: 10000,
//       pop: 0.27,
//       rain: {
//         '3h': 0.14,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-26 21:00:00',
//     },
//     {
//       dt: 1758931200,
//       main: {
//         temp: 298.71,
//         feels_like: 299.54,
//         temp_min: 298.71,
//         temp_max: 298.71,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1006,
//         humidity: 85,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 2.14,
//         deg: 181,
//         gust: 2.32,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 1.91,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-27 00:00:00',
//     },
//     {
//       dt: 1758942000,
//       main: {
//         temp: 299.1,
//         feels_like: 299.1,
//         temp_min: 299.1,
//         temp_max: 299.1,
//         pressure: 1009,
//         sea_level: 1009,
//         grnd_level: 1009,
//         humidity: 81,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 2.83,
//         deg: 167,
//         gust: 2.46,
//       },
//       visibility: 10000,
//       pop: 0.71,
//       rain: {
//         '3h': 0.4,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-27 03:00:00',
//     },
//     {
//       dt: 1758952800,
//       main: {
//         temp: 298.76,
//         feels_like: 299.57,
//         temp_min: 298.76,
//         temp_max: 298.76,
//         pressure: 1009,
//         sea_level: 1009,
//         grnd_level: 1008,
//         humidity: 84,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 804,
//           main: 'Clouds',
//           description: 'overcast clouds',
//           icon: '04d',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 3.6,
//         deg: 193,
//         gust: 3.15,
//       },
//       visibility: 10000,
//       pop: 0.5,
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-27 06:00:00',
//     },
//     {
//       dt: 1758963600,
//       main: {
//         temp: 299.03,
//         feels_like: 299.84,
//         temp_min: 299.03,
//         temp_max: 299.03,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1006,
//         humidity: 83,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 804,
//           main: 'Clouds',
//           description: 'overcast clouds',
//           icon: '04d',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 4.46,
//         deg: 206,
//         gust: 4.27,
//       },
//       visibility: 10000,
//       pop: 0.12,
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-27 09:00:00',
//     },
//     {
//       dt: 1758974400,
//       main: {
//         temp: 298.35,
//         feels_like: 299.22,
//         temp_min: 298.35,
//         temp_max: 298.35,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1006,
//         humidity: 88,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 6.32,
//         deg: 198,
//         gust: 6.5,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 1.43,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-27 12:00:00',
//     },
//     {
//       dt: 1758985200,
//       main: {
//         temp: 298.41,
//         feels_like: 299.34,
//         temp_min: 298.41,
//         temp_max: 298.41,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1008,
//         humidity: 90,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 501,
//           main: 'Rain',
//           description: 'moderate rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 6.54,
//         deg: 211,
//         gust: 6.95,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 3.46,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-27 15:00:00',
//     },
//     {
//       dt: 1758996000,
//       main: {
//         temp: 298.91,
//         feels_like: 299.76,
//         temp_min: 298.91,
//         temp_max: 298.91,
//         pressure: 1008,
//         sea_level: 1008,
//         grnd_level: 1007,
//         humidity: 85,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 5.36,
//         deg: 207,
//         gust: 5.6,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 0.56,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-27 18:00:00',
//     },
//     {
//       dt: 1759006800,
//       main: {
//         temp: 298.87,
//         feels_like: 299.69,
//         temp_min: 298.87,
//         temp_max: 298.87,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1006,
//         humidity: 84,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 4.96,
//         deg: 226,
//         gust: 5.84,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 0.68,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-27 21:00:00',
//     },
//     {
//       dt: 1759017600,
//       main: {
//         temp: 299.55,
//         feels_like: 299.55,
//         temp_min: 299.55,
//         temp_max: 299.55,
//         pressure: 1006,
//         sea_level: 1006,
//         grnd_level: 1006,
//         humidity: 81,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 500,
//           main: 'Rain',
//           description: 'light rain',
//           icon: '10n',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 4.32,
//         deg: 254,
//         gust: 5.67,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 1.71,
//       },
//       sys: {
//         pod: 'n',
//       },
//       dt_txt: '2025-09-28 00:00:00',
//     },
//     {
//       dt: 1759028400,
//       main: {
//         temp: 299.53,
//         feels_like: 299.53,
//         temp_min: 299.53,
//         temp_max: 299.53,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1007,
//         humidity: 83,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 501,
//           main: 'Rain',
//           description: 'moderate rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 4.59,
//         deg: 249,
//         gust: 5.86,
//       },
//       visibility: 10000,
//       pop: 1,
//       rain: {
//         '3h': 4.35,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-28 03:00:00',
//     },
//     {
//       dt: 1759039200,
//       main: {
//         temp: 299.27,
//         feels_like: 299.27,
//         temp_min: 299.27,
//         temp_max: 299.27,
//         pressure: 1007,
//         sea_level: 1007,
//         grnd_level: 1006,
//         humidity: 86,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 501,
//           main: 'Rain',
//           description: 'moderate rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 4.61,
//         deg: 270,
//         gust: 5.37,
//       },
//       visibility: 4571,
//       pop: 1,
//       rain: {
//         '3h': 5.49,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-28 06:00:00',
//     },
//     {
//       dt: 1759050000,
//       main: {
//         temp: 298.81,
//         feels_like: 299.76,
//         temp_min: 298.81,
//         temp_max: 298.81,
//         pressure: 1004,
//         sea_level: 1004,
//         grnd_level: 1004,
//         humidity: 89,
//         temp_kf: 0,
//       },
//       weather: [
//         {
//           id: 501,
//           main: 'Rain',
//           description: 'moderate rain',
//           icon: '10d',
//         },
//       ],
//       clouds: {
//         all: 100,
//       },
//       wind: {
//         speed: 7.34,
//         deg: 283,
//         gust: 8.98,
//       },
//       visibility: 4557,
//       pop: 1,
//       rain: {
//         '3h': 7.62,
//       },
//       sys: {
//         pod: 'd',
//       },
//       dt_txt: '2025-09-28 09:00:00',
//     },
//   ],
//   city: {
//     id: 1275339,
//     name: 'Mumbai',
//     coord: {
//       lat: 19.0144,
//       lon: 72.8479,
//     },
//     country: 'IN',
//     population: 1000000,
//     timezone: 19800,
//     sunrise: 1758589058,
//     sunset: 1758632669,
//   },
// };
// const dataSeries = series.list.map((item) =>
//   Math.floor(item.main.temp - 273.15)
// );
// const dataLabels = series.list.map((item) => item.dt_txt);
