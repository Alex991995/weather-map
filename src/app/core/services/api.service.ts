import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IForecastData,
  IResponseCityById,
  IUserBody,
  IUserCreateResult,
  IUserLoginCredential,
  IWeatherInfo,
} from 'app/shared/interfaces';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private weatherURL = 'https://api.openweathermap.org';
  private authURL = 'http://localhost:3000';
  private http = inject(HttpClient);

  createUser(body: IUserBody) {
    return this.http.post<IUserCreateResult>(
      `${this.authURL}/user/create`,
      body
    );
  }

  loginUser(body: IUserLoginCredential) {
    return this.http.post(`${this.authURL}/auth/login`, body, {
      withCredentials: true,
    });
  }

  getIconWeather(icon: string) {
    const url = 'http://openweathermap.org/img/wn';
    return this.http.get(`${url}/${icon}@2x.png`, { responseType: 'blob' });
  }

  getSetOfCitiesForecast() {
    const arr = [524901, 703448, 2643743];

    const requests = arr.map((city) =>
      this.http.get<IResponseCityById>(
        `${this.weatherURL}/data/2.5/weather?id=${city}`
      )
    );

    return forkJoin(requests);
  }

  getAllFavCityIDUser() {
    return this.http.get(`${this.authURL}/user/favorite`, {
      withCredentials: true,
    });
  }

  fetchByCityName(name: string) {
    return this.http.get<IWeatherInfo[]>(
      `${this.weatherURL}/data/3/find?q=${name}`
    );
  }

  fetchForecastCity(city: string) {
    return this.http.get<IForecastData>(
      `${this.weatherURL}/data/2.5/forecast?q=${city}`
    );
  }

  addFavoriteCityByID(id: number) {
    const body = { id };
    return this.http.post(`${this.authURL}/user/favorite`, body, {
      withCredentials: true,
    });
  }

  getUser() {
    return this.http.get(`${this.authURL}/user`, {
      withCredentials: true,
    });
  }
}
