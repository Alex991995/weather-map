import { IResponseCity } from 'app/shared/interfaces';

export function extractNecessaryFieldsForCards(data: IResponseCity[]) {
  return data.map((city) => {
    return {
      name: city.name,
      icon: city.weather[0].icon,
      temp: city.main.temp,
      humidity: city.main.humidity,
      pressure: city.main.pressure,
      description: city.weather[0].description,
      country: city.sys.country,
    };
  });
}
