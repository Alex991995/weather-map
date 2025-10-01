import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AddAPIKeyToRequest } from '@interceptors/add-apikey-to-request.service';
import { errorsInterceptor } from '@interceptors/error-handler-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([AddAPIKeyToRequest, errorsInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
