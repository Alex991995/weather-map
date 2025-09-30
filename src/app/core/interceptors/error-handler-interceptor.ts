import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router, RedirectCommand } from '@angular/router';
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
  const router = inject(Router);
  const toastService = inject(ToastService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 403) {
          console.log('false');
          authService.setStatusAuthorization(false);
        }
        console.log(false);
        // authService.setStatusAuthorization(false);
        toastService.showToast(error.statusText);
        // new RedirectCommand(router.parseUrl('/login'));
      }

      return throwError(() => error);
    })
  );
};

// @Injectable()
// export class ErrorsInterceptor implements HttpInterceptor {
//   private router = inject(Router);

function handleUnauthorizedError(error: HttpErrorResponse) {
  console.log(error);
  if (
    error.status === HttpErrorsApi.Unauthorized ||
    error.status === HttpErrorsApi.Forbidden
  ) {
    localStorage.clear();
    // if (this.router.url !== '/auth/login') this.router.navigateByUrl('/');
    // return throwError(() => error);
  } else return;
}

// intercept(req: HttpRequest<unknown>, next: HttpHandler) {
//   console.log(req);
//   return next.handle(req).pipe(
//     catchError((error: unknown) => {
//       if (!(error instanceof HttpErrorResponse))
//         return throwError(() => error);

//       handleUnauthorizedError(error);

//       return throwError(() => error);
//     })
//   );
// }
// }
