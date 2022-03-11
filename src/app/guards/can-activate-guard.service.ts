import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from './../alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService, private alertService: AlertService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = sessionStorage.getItem('currentUser') ?
      JSON.parse(sessionStorage.getItem('currentUser') as string).token : null;

    if (token) {
      const decodedToken = this.jwtHelperService.decodeToken(token);

      const role = decodedToken.role;


      if (this.loginService.isAuthenticated() && route.data.roles.includes(role)) {
        return true;
      }
      else {
        this.alertService.showError('Unauthorized', 'Access Denied')
        this.router.navigate(["/login"])
        return false;
      }
    }
    else {
      this.alertService.showError('Access Denied', 'Login to access the page')
      this.router.navigate(["/login"])
      return false;
    }
  }


}
