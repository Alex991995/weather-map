export interface IForecastForCard {
  date: string;
  warmest: number;
  coldest: null | number;
  icon: string;
  description: string;
  precipitation: number;
  humidity: number;
  pressure: number;
}
