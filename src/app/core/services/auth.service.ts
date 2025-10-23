import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiService = inject(ApiService);
  isAuthorized = signal(true);

  setStatusAuthorization(status: boolean) {
    this.isAuthorized.set(status);
  }

  isLoggedIn() {
    return this.apiService.verifyToken().pipe(
      map((res) => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
