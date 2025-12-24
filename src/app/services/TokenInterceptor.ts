import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public loginService: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.getAuthorizationHeaderValue()?.toString() || '';
        const request = token
            ? req.clone({ setHeaders: { Authorization: `${token}` } })
            : req;
        return next.handle(request);
    }


}
