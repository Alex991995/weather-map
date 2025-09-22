import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AddAPIKeyToRequest } from '@interceptors/add-apikey-to-request.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AddAPIKeyToRequest])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
