import { IForecastData, IForecastForCard } from 'app/shared/interfaces';

export function buildForecast(forecastData: IForecastData) {
  const noon = forecastData.list.filter((item) =>
    item.dt_txt.endsWith('12:00:00')
  );
  const evening = forecastData.list.filter((item) =>
    item.dt_txt.endsWith('21:00:00')
  );

  const forecast = [];

  for (let n of noon) {
    const date = n.dt_txt.split(' ')[0];

    const obj: IForecastForCard = {
      date,
      warmest: n.main.temp,
      coldest: null,
      icon: n.weather[0].icon,
      description: n.weather[0].description,
      precipitation: n.pop,
      humidity: n.main.humidity,
      pressure: n.main.pressure,
    };

    const e = evening.find((x) => x.dt_txt.startsWith(date));
    obj.coldest = e ? e.main.temp : null;
    forecast.push(obj);
  }

  return forecast;
}
