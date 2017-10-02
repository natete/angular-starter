import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenService {

  private readonly AUTH_INFO_KEY = 'starter-auth';
  private isValidTokenSubject = new Subject<boolean>();

  constructor() { }

  getAccessToken(): any {
    const authInfo = localStorage.getItem(this.AUTH_INFO_KEY);
    return authInfo ? JSON.parse(authInfo).accessToken : null;
  }

  setAuthInfo(authInfo: any) {
    localStorage.setItem(this.AUTH_INFO_KEY, JSON.stringify(authInfo));
    this.isValidTokenSubject.next(true);
  }

  getRefreshToken() {
    const authInfo = localStorage.getItem(this.AUTH_INFO_KEY);
    return authInfo ? JSON.parse(authInfo).refreshToken : null;
  }

  clearToken() {
    localStorage.removeItem(this.AUTH_INFO_KEY);
    this.isValidTokenSubject.next(false);
  }

  isValidToken(): Observable<boolean> {
    return this.isValidTokenSubject.asObservable();
  }
}
