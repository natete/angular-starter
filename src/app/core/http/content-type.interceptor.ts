import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ENDPOINTS_CONSTANTS } from '../constants/endopoints.constants';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if ((req.method === 'POST' || req.method === 'PUT')
      && !req.url.replace(environment.baseUrl, '').startsWith(ENDPOINTS_CONSTANTS.REFRESH)
      && !req.url.replace(environment.baseUrl, '').startsWith(ENDPOINTS_CONSTANTS.LOGOUT)) {

      const contentReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });

      return next.handle(contentReq);
    } else if (req.url.replace(environment.baseUrl, '').startsWith(ENDPOINTS_CONSTANTS.LOGOUT)) {
      const contentReq = req.clone({ responseType: 'text' });

      return next.handle(contentReq);
    } else {
      return next.handle(req);
    }
  }

}
