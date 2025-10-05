import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cookieService = inject(CookieService);
  apiService = inject(ApiService);
  isAuthorized = signal(true);

  setStatusAuthorization(status: boolean) {
    this.isAuthorized.set(status);
  }

  isLoggedIn() {
    return this.apiService.verifyToken().pipe(
      map((res) => {
        // this.setStatusAuthorization(true);
        return true;
      }),
      catchError(() => {
        // this.setStatusAuthorization(false);
        return of(false);
      })
    );
  }
}
