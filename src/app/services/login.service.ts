import { Injectable } from '@angular/core';
import {Doc} from '../types/document';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  host = environment.backend + '/login';
  private authenticationToken: String = '';

  constructor(private httpSvc: HttpClient) { }

  public getAuthToken(username: String, password: String): Subscription {
    return this.httpSvc.post(this.host, {'username': username, 'password': password})
         .subscribe((token: TokenResponse) => {
           this.authenticationToken = token.sessionId;
           localStorage.setItem('authenticationToken', this.authenticationToken.toString());
         });
  }

  getAuthorizationHeaderValue (): String {
      if (this.authenticationToken === '' && localStorage.getItem('authenticationToken')) {
          // Check local storage
         return localStorage.getItem('authenticationToken');
      } else {
          return this.authenticationToken;
      }
  }

    public checkAuthToken() {
        const authenticationToken = this.getAuthorizationHeaderValue();

        if (!authenticationToken) {
            this.logout();
            return;
        }

        this.httpSvc.post<boolean>(`${this.host}/checkSessionId/${authenticationToken}`, null)
            .subscribe(
                (isTokenValid: boolean) => {
                    if (!isTokenValid) {
                        this.logout();
                    }
                },
                (error) => {
                    console.error('Error checking authentication token:', error);
                    this.logout();
                }
            );
    }

  logout (): String {
      localStorage.clear();
     return this.authenticationToken = '';
  }
}


class TokenResponse {
  sessionId: String;
}
