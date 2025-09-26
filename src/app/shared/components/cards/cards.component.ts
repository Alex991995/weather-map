import { Component, input, signal } from '@angular/core';
import { ConvertTempPipe } from '../../pipes/convert-temp.pipe';

@Component({
  selector: 'app-cards',
  imports: [ConvertTempPipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  title = input.required();
  weatherData = signal(data);
}

const data = [
  {
    coord: {
      lon: 37.6156,
      lat: 55.7522,
    },
    weather: [
      {
        id: 801,
        main: 'Clouds',
        description: 'few clouds',
        icon: '02d',
      },
    ],
    base: 'stations',
    main: {
      temp: 283.65,
      feels_like: 282.45,
      temp_min: 282.39,
      temp_max: 284.08,
      pressure: 1029,
      humidity: 65,
      sea_level: 1029,
      grnd_level: 1010,
    },
    visibility: 10000,
    wind: {
      speed: 4.7,
      deg: 312,
      gust: 6.72,
    },
    clouds: {
      all: 18,
    },
    dt: 1758875913,
    sys: {
      type: 2,
      id: 2094500,
      country: 'RU',
      sunrise: 1758856945,
      sunset: 1758899959,
    },
    timezone: 10800,
    id: 524901,
    name: 'Moscow',
    cod: 200,
  },
  {
    coord: {
      lon: 30.5167,
      lat: 50.4333,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 286.88,
      feels_like: 285.82,
      temp_min: 286.88,
      temp_max: 286.88,
      pressure: 1035,
      humidity: 58,
      sea_level: 1035,
      grnd_level: 1018,
    },
    visibility: 10000,
    wind: {
      speed: 0.45,
      deg: 2,
      gust: 1.79,
    },
    clouds: {
      all: 3,
    },
    dt: 1758876012,
    sys: {
      type: 2,
      id: 2003742,
      country: 'UA',
      sunrise: 1758858613,
      sunset: 1758901697,
    },
    timezone: 10800,
    id: 703448,
    name: 'Kyiv',
    cod: 200,
  },
  {
    coord: {
      lon: -0.1257,
      lat: 51.5085,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    base: 'stations',
    main: {
      temp: 285.37,
      feels_like: 284.58,
      temp_min: 284.21,
      temp_max: 286.01,
      pressure: 1022,
      humidity: 74,
      sea_level: 1022,
      grnd_level: 1018,
    },
    visibility: 10000,
    wind: {
      speed: 2.06,
      deg: 30,
    },
    clouds: {
      all: 100,
    },
    dt: 1758875599,
    sys: {
      type: 2,
      id: 2075535,
      country: 'GB',
      sunrise: 1758865983,
      sunset: 1758909033,
    },
    timezone: 3600,
    id: 2643743,
    name: 'London',
    cod: 200,
  },
];
