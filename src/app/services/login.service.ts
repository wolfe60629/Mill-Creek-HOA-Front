import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  host = environment.backend + '/login';
  private authenticationToken: string = '';

  constructor(private httpSvc: HttpClient) { }

  public getAuthToken(username: string, password: string): Subscription {
    return this.httpSvc.post(this.host, {'username': username, 'password': password})
         .subscribe((token: TokenResponse) => {
           this.authenticationToken = token.sessionId?.toString() || '';
           localStorage.setItem('authenticationToken', this.authenticationToken);
         });
  }

  getAuthorizationHeaderValue(): string {
    if (this.authenticationToken && this.authenticationToken.length > 0) {
      return this.authenticationToken;
    }
    const stored = localStorage.getItem('authenticationToken');
    return stored ? stored.toString() : '';
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

  logout(): string {
    localStorage.removeItem('authenticationToken');
    this.authenticationToken = '';
    return this.authenticationToken;
  }
}


class TokenResponse {
  sessionId: string;
}
