import { HttpHandlerFn, HttpParams, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '@core/services/language.service';

export function setAPIKey(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const lang = inject(LanguageService).language();
  const params = new HttpParams()
    .set('appid', '072ddfcf932730e7863190ee2f0af0e0')
    .set('lang', lang);

  const cloneReq = req.clone({ params });

  if (req.method === 'POST') {
    return next(req.clone({ withCredentials: true }));
  } else {
    return next(cloneReq);
  }
}
