import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has('token')) {
      if (localStorage.getItem('AuthToken')) {
        const token = localStorage.getItem('AuthToken');

        const reqClone = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token),
        });

        return next.handle(reqClone);
      } else {
        this.router.navigate(['/login']);
        return next.handle(request);
      }
    } else {
      return next.handle(request);
    }
  }
}
