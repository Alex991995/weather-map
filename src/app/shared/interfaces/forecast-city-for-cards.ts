export interface IForecastCityForCards {
  name: string;
  icon: string;
  temp: number;
  humidity: number;
  pressure: number;
  description: string;
  country: string;
  currentWether?: string;
}
