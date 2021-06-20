import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PostInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.method === "POST") {
      request = request.clone({
        setHeaders: Object.assign(
          {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        )
      });
    }

    return next.handle(request);
  }
}
