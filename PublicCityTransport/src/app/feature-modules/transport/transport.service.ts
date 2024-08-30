import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus } from './model/bus.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) { }

//BUSES
  getAll(): Observable<PagedResults<Bus>> {
    return this.http.get<PagedResults<Bus>>(environment.apiHost + 'bus/getAll');
  }

  createBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(environment.apiHost + 'bus/create', bus);
  }

  updateBus(bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(environment.apiHost + 'bus/update/' + bus.id, bus)
  }

  deleteBus(id: number): Observable<Bus> {
    return this.http.delete<Bus>(environment.apiHost + 'bus/delete/' + id);
  }

  addDriver(driverId: number, busId: number): Observable<Bus> {
    return this.http.get<Bus>(`${environment.apiHost}bus/addDriver/${driverId}/${busId}`);
  }

  removeDriver(driverId: number, busId: number): Observable<Bus> {
    return this.http.get<Bus>(`${environment.apiHost}bus/removeDriver/${driverId}/${busId}`);
  }

}
