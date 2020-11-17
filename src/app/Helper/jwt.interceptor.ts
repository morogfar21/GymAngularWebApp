import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
       //const user = this.accountService.userValue;
        const token = localStorage.getItem('token');
        console.log("token received in interceptor: " + token);
        const isLoggedIn = token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        console.log("Starts intercepting with JWT Token");
        if (isLoggedIn && isApiUrl) {
            console.log("Setting Token in header")
            request = request.clone({
                setHeaders: {
                    //Bearer token is a signed temporary replacement for username/password
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}