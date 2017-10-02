import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';
import { ENDPOINTS_CONSTANTS } from '../constants/endopoints.constants';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

  isAuthenticated(): boolean {
    return !!this.tokenService.getAccessToken();
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.tokenService.getRefreshToken();

    return this.http.post(`${environment.baseUrl}${ENDPOINTS_CONSTANTS.REFRESH}`, { refreshToken })
               .map(data => this.tokenService.setAuthInfo(data));
  }

  logOut(): Observable<any> {
    const refreshToken = this.tokenService.getRefreshToken();
    const accessToken = this.tokenService.getAccessToken();

    return this.http.post(`${environment.baseUrl}${ENDPOINTS_CONSTANTS.LOGOUT}`, { accessToken, refreshToken })
               .map(() => this.tokenService.clearToken());
  }
}
