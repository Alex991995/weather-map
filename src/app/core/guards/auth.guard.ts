import { inject } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isLoggedIn().pipe(
    map((isAuthorized) => {
      if (isAuthorized) {
        authService.setStatusAuthorization(true);
        return true;
      } else {
        authService.setStatusAuthorization(false);
        return new RedirectCommand(router.parseUrl('/login'));
      }
    })
  );
};
