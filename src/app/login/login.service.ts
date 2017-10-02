import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ENDPOINTS_CONSTANTS } from '../core/constants/endopoints.constants';
import { TokenService } from '../core/auth/token.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/retry';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${ENDPOINTS_CONSTANTS.LOGIN}`, { username, password })
               .retry(1)
               .map(authInfo => this.tokenService.setAuthInfo(authInfo));
  }
}
