import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientLocation } from './client-location';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationsService {

  private url: string = 'http://localhost:9090/api/clientlocations';
  constructor(private http: HttpClient) { }

  getClientLocations(): Observable<ClientLocation[]> {
    return this.http.get<ClientLocation[]>(this.url)
  }
}
