import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDataService } from '../Auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthDataService) {};

  intercept(req: HttpRequest<any>, next: HttpHandler ) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('authorization',"Bearer " + authToken)
    });
    return next.handle(authRequest);
  }

}
