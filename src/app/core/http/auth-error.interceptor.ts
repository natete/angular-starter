import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ENDPOINTS_CONSTANTS } from '../constants/endopoints.constants';
import { ERROR_CODE_CONSTANTS } from '../constants/error-code.constants';
import { environment } from '../../../environments/environment';
import { TokenService } from '../auth/token.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  private refreshing = new BehaviorSubject<boolean>(false);
  private updatedRequest: HttpRequest<any>;

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
               .map(event => event)
               .catch(event => this.handleAuthError(event, req, next));
  }

  private handleAuthError(event: any, req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (event instanceof HttpErrorResponse) {
      if (event.status === 401) {

        let error;

        if (event.error) {
          if (typeof event.error === 'string') {
            error = JSON.parse(event.error);
          }  else {
            error = event.error;
          }
        }

        if (error && +error.code === ERROR_CODE_CONSTANTS.EXPIRED_TOKEN && !this.refreshing.getValue()) {
          // The error is due to expired token and no request to refresh has been made.
          this.refreshing.next(true);

          // Prepare a refresh token request.
          const refreshToken = `"${this.tokenService.getRefreshToken()}"`;
          const refreshRequest = new HttpRequest<any>('POST', `${environment.baseUrl}${ENDPOINTS_CONSTANTS.REFRESH}`, refreshToken);

          // Request a new token and then retry the failed request.
          return next.handle(refreshRequest)
                     .filter(ev => ev instanceof HttpResponse)
                     .do((ev: HttpResponse<any>) => this.tokenService.setAuthInfo(ev.body))
                     .do((ev: HttpResponse<any>) => this.refreshing.next(false))
                     .do((ev: HttpResponse<any>) => this.updateRequest(req))
                     .flatMap(ev => next.handle(this.updatedRequest))
                     .catch(ev => this.handleRefreshTokenError(ev));

        } else if (error && +error.code === ERROR_CODE_CONSTANTS.EXPIRED_TOKEN && this.refreshing.getValue()) {
          // The error is due to token expiration but we already requested a new token.
          return this.refreshing.asObservable()
                     .filter(isRefreshing => !isRefreshing)
                     .do(() => this.updateRequest(req))
                     .flatMap(() => next.handle(this.updatedRequest));
        } else if (error && +error.code === ERROR_CODE_CONSTANTS.UNAUTHORIZED) {
          // The error is the token is invalid. We remove the token.
          this.tokenService.clearToken();
          return Observable.throw(error);
        } else {
          // The error is not expired token. The error is rethrown to be managed later.
          return Observable.throw(error);
        }

      } else {
        // The error is not unauthorized.
        return Observable.throw(event.error);
      }
    }
  }

  private handleRefreshTokenError(ev: any) {
    if (ev instanceof HttpErrorResponse && ev.url.indexOf(ENDPOINTS_CONSTANTS.REFRESH) >= 0) {
      this.tokenService.clearToken();
    }
    return Observable.of(ev);
  }

  private updateRequest(req: HttpRequest<any>) {
    this.updatedRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this.tokenService.getAccessToken()}`) });
  }
}
