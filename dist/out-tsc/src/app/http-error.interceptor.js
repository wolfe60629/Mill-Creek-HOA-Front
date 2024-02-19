var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
let HttpErrorInterceptor = class HttpErrorInterceptor {
    intercept(request, next) {
        return next.handle(request).pipe(retry(1), catchError((error) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Error: ${error.error.message}`;
            }
            else {
                // server-side error
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            // window.alert(errorMessage);
            return throwError(errorMessage);
        }));
    }
};
HttpErrorInterceptor = __decorate([
    Injectable()
], HttpErrorInterceptor);
export { HttpErrorInterceptor };
//# sourceMappingURL=http-error.interceptor.js.map