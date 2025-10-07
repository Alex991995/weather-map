import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IForecastData,
  IResponseCity,
  IResponseIdsCityUser,
  IResponseUserData,
  IUserBody,
  IUserCreateResult,
  IUserLoginCredential,
} from 'app/shared/interfaces';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private weatherURL = 'https://api.openweathermap.org';
  private authURL = 'http://localhost:3000';
  private http = inject(HttpClient);

  getIconWeather(icon: string) {
    const url = 'http://openweathermap.org/img/wn';
    return this.http.get(`${url}/${icon}@2x.png`, { responseType: 'blob' });
  }

  getSetOfCitiesForecast(arr: number[]) {
    const requests = arr.map((city) =>
      this.http.get<IResponseCity>(
        `${this.weatherURL}/data/2.5/weather?id=${city}`
      )
    );

    return forkJoin(requests);
  }

  fetchByCityName(name: string) {
    return this.http.get<IResponseCity>(
      `${this.weatherURL}/data/2.5/weather?q=${name}`
    );
  }

  fetchByArrayCityName(array: string[]) {
    const requests = array.map((city) =>
      this.http.get<IForecastData>(
        `${this.weatherURL}/data/2.5/forecast?q=${city}`
      )
    );

    return forkJoin(requests);
  }

  fetchForecastCity(city: string) {
    return this.http.get<IForecastData>(
      `${this.weatherURL}/data/2.5/forecast?q=${city}`
    );
  }

  createUser(body: IUserBody) {
    return this.http.post<IUserCreateResult>(
      `${this.authURL}/user/create`,
      body
    );
  }

  loginUser(body: IUserLoginCredential) {
    return this.http.post<{ access_token: string }>(
      `${this.authURL}/auth/login`,
      body
    );
  }

  getAllFavCityIDUser() {
    return this.http.get<IResponseIdsCityUser>(
      `${this.authURL}/user/favorite`,
      {
        withCredentials: true,
      }
    );
  }

  getPopularIDCityByAdmin() {
    return this.http.get<IResponseIdsCityUser>(`${this.authURL}/user/popular`, {
      withCredentials: true,
    });
  }

  setDefaultCity(defaultCityName: string) {
    const body = { defaultCityName };
    return this.http.post<IResponseIdsCityUser>(
      `${this.authURL}/user/default`,
      body
    );
  }

  addFavoriteCityByID(id: number) {
    const body = { id };
    return this.http.post<{ is_added: boolean }>(
      `${this.authURL}/user/favorite`,
      body
    );
  }

  getUser() {
    return this.http.get<IResponseUserData>(`${this.authURL}/user`, {
      withCredentials: true,
    });
  }

  verifyToken() {
    return this.http.get(`${this.authURL}/auth/verify`, {
      withCredentials: true,
    });
  }
  logOut() {
    return this.http.get(`${this.authURL}/auth/logout`, {
      withCredentials: true,
    });
  }
}
