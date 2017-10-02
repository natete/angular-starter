import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from '../auth/token.service';
import { ENDPOINTS_CONSTANTS } from '../constants/endopoints.constants';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.replace(environment.baseUrl, '').startsWith(`/${ENDPOINTS_CONSTANTS.LOGIN}`)) {
      req.headers.append('Authorization', `Bearer ${this.tokenService.getAccessToken()}`);
      const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this.tokenService.getAccessToken()}`) });

      return next.handle(authReq);

    } else {
      return next.handle(req);
    }
  }

}
