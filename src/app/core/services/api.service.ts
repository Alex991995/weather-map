import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IForecastData,
  IUserBody,
  IUserCreateResult,
  IUserLoginCredential,
  IWeatherInfo,
} from 'app/shared/interfaces';

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
    //  https://openweathermap.org/img/wn/10d@2x.png
    return this.http.get(`${url}/${icon}@2x.png`, { responseType: 'blob' });
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
    // api.openweathermap.org/data/2.5/forecast?q={city name}
  }

  getUser() {
    return this.http.get(`${this.authURL}/user`, {
      withCredentials: true,
    });
  }
}
