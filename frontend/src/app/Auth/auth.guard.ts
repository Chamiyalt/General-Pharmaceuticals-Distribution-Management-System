import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthDataService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthDataService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
    const isAuth = this.authService.getIsAuth();


    if(!isAuth){
      this.router.navigate(['/login']);
    }
    return isAuth ;
  }
}
