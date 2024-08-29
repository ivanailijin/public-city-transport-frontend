import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusRegistration } from './model/bus.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) { }

  createBus(busRegistration: BusRegistration): Observable<BusRegistration> {
    return this.http.post<BusRegistration>(environment.apiHost + 'bus/create', busRegistration);
  }
}
