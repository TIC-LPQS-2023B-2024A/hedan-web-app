import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionService } from '../services/auth/session.service';

@Injectable()
export class UnAuthInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {

    if (!request.withCredentials) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.sessionService.logout();
            this.router.navigate(['/login']);
            return throwError(() => error);
          default:
            return throwError(() => error);
        }
      }),
    );
  }
}
