import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = sessionStorage.getItem('currentUser') ?
      JSON.parse(sessionStorage.getItem('currentUser') as string).token : null;

    const decodedToken = this.jwtHelperService.decodeToken(token);

    const role = decodedToken.role;


    if (this.loginService.isAuthenticated() && route.data.roles.includes(role)) {
      return true;
    }
    else {
      this.router.navigate(["/login"])
      return false;
    }
  }


}
