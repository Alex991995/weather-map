export interface IWeatherInfo {
  id: number;
  name: string;
  lat: number;
  lon: number;
  weather: Weather[];
  country: string;
  wind: Wind;
  rain: any;
  clouds: Clouds;
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}
