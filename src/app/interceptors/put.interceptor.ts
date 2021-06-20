import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpTrackerService } from '../services/http-tracker.service';

@Injectable()
export class PutInterceptor implements HttpInterceptor {

  
  constructor(private httpTracker: HttpTrackerService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isConnected = this.httpTracker.getIsAuth();
    const token = this.httpTracker.getToken();

    if (request.method === "PUT") {
      request = request.clone({
        setHeaders: Object.assign(
          {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          },
        )
      });
    }
    return next.handle(request);
  }
}
