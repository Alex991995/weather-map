import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { catchError, throwError } from 'rxjs';

export enum HttpErrorsApi {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Forbidden = 403,
  Conflict = 409,
  ServerError = 500,
  ServerUnuvailable = 503,
  GatewayTimeout = 504,
}

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === HttpErrorsApi.Forbidden) {
          authService.setStatusAuthorization(false);
          toastService.showToast(error.statusText);
        } else if (error.status === HttpErrorsApi.NotFound) {
          const customError = error.error as {
            cod: string;
            message: string;
          };
          toastService.showToast(customError.message);
        } else {
          toastService.showToast(error.statusText);
        }
      }
      return throwError(() => error);
    })
  );
};
