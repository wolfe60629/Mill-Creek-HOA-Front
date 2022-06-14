import { Injectable } from '@angular/core';
import {Doc} from '../types/document';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  host = environment.backend + '/login';
  private authenicationToken: String = '';

  constructor(private httpSvc: HttpClient,
              private router: Router) { }

  public getAuthToken(username: String, password: String): Subscription {
    return this.httpSvc.post(this.host, {'username': username, 'password': password})
         .subscribe((token: TokenResponse) => {
           this.authenicationToken = token.sessionId;
           localStorage.setItem('authenticationToken', this.authenicationToken.toString());
         });
  }

  getAuthorizationHeaderValue () {
      if (this.authenicationToken === '' && localStorage.getItem('authenticationToken')) {
          // Check local storage
         return localStorage.getItem('authenticationToken');
      } else {
          return this.authenicationToken;
      }
  }

  public checkAuthToken() {
      this.authenicationToken = this.getAuthorizationHeaderValue();

      if (!this.authenicationToken) {
          this.logout();
          return;
      }

      return this.httpSvc.post(this.host + '/checkSessionId/' + this.authenicationToken, null)
          .subscribe((isTokenValid: boolean) => {
              if (!isTokenValid) {
                  this.logout();
              }
          });

  }

  logout (): String {
      localStorage.clear();
      this.router.navigate(['/login']);
      return this.authenicationToken = '';
  }
}


class TokenResponse {
  sessionId: String;
}
