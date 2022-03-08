import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: any = null;

  private url: string = 'http://localhost:9090/authenticate'

  constructor(private http: HttpClient) { }

  loginUser(login: Login): Observable<any> {
    return this.http.post<any>(this.url, login)
      .pipe(
        map((user: any) => {
          this.currentUser = user.userName
          sessionStorage.currentUser = JSON.stringify(user);
        })
      )
  }

  logoutUser() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser')
  }

  isUserLoggedIn() {
    return this.currentUser != null ? true : false;
  }
}
