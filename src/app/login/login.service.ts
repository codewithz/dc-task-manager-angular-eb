import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://localhost:9090/authenticate'

  constructor(private http: HttpClient) { }

  loginUser(login: Login): Observable<any> {
    return this.http.post<any>(this.url, login);
  }
}
