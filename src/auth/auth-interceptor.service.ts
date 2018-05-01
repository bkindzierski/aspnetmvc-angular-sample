import { Injectable, Injector } from "@angular/core";
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { HttpParams } from "@angular/common/http/src/params";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        var auth = this.injector.get(AuthService);

        console.log('auth.isLoggedIn(): ' + auth.isLoggedIn());

        var token = (auth.isLoggedIn()) ? auth.getAuth()!.token : null;

        console.log('Interceptor token: ' + token);

        //var p = new HttpParams();
        //p.append('IsAuthenticated', 'true');

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
        }
        return next.handle(request);
    }
}
