import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function AddAPIKeyToRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const cloneReq = req.clone({
    params: req.params.set('appid', '072ddfcf932730e7863190ee2f0af0e0'),
  });
  if (cloneReq.method === 'POST') {
    return next(req.clone({ withCredentials: true }));
  } else {
    return next(cloneReq);
  }
}
