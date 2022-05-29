import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsModifierInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let newRequest:HttpRequest<any>;
    newRequest=request.clone({
     headers:request.headers.set("Access-Control-Allow-Origin", "*")
     .set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
     .set("Access-Control-Allow-Headers", "*")
    });

    return next.handle(request);
  }
}
