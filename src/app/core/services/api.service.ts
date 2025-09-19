import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserBody, IUserCreateResult } from 'app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  weatherURL = 'https://api.openweathermap.org/data/3';
  authURL = 'http://localhost:3000';
  http = inject(HttpClient);

  fetchByCityName(name: string) {
    return this.http.get(`${this.weatherURL}/find?q=${name}`);
  }

  createUser(body: IUserBody) {
    return this.http.post<IUserCreateResult>(
      `${this.authURL}/user/create`,
      body
    );
  }
}
