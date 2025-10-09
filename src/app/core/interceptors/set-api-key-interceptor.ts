import { HttpHandlerFn, HttpParams, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '@core/services/language.service';
import { authURL } from 'app/shared/constants';
import { environment } from 'environments/environment';

export function setAPIKey(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const appid = environment.apiKey;
  const lang = inject(LanguageService).language();
  const params = new HttpParams().set('appid', appid).set('lang', lang);

  const weatherApiRequest = req.clone({ params });

  if (req.url.startsWith(authURL)) {
    return next(req.clone({ withCredentials: true }));
  } else {
    return next(weatherApiRequest);
  }
}
