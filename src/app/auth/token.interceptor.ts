import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpTrackerService } from '../services/http-tracker.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private httpTracker: HttpTrackerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const excludePath = [
      '/login'
    ];

    const isConnected = this.httpTracker.getIsAuth();
    const token = this.httpTracker.getToken();
    
    //vérifie si l'url de la requête correspond à un des éléments du tableau des urls exclues
    const isExcludePath = excludePath.find(el => new RegExp(`${el}.*`, 'g').test(request.url));

    if (!isExcludePath) {
      request = request.clone({
        setHeaders: Object.assign(
          {
            Authorization: `Bearer ${token}`
          },
        )
      })
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isExcludePath) {
          this.httpTracker.logOut();
        }
        return throwError(error);
      })
    )
  }
}
