import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IUserBody,
  IUserCreateResult,
  IUserLoginCredential,
  IWeatherInfo,
} from 'app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private weatherURL = 'https://api.openweathermap.org/data/3';
  private authURL = 'http://localhost:3000';
  private http = inject(HttpClient);

  fetchByCityName(name: string) {
    return this.http.get<IWeatherInfo[]>(`${this.weatherURL}/find?q=${name}`);
  }

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
  getUser() {
    return this.http.get(`${this.authURL}/user`, {
      withCredentials: true,
    });
  }
}
