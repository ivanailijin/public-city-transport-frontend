import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus } from './model/bus.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results';
import { Line, LineOut } from './model/line.model';
import { Station } from './model/station.model';
import { Location } from './model/location.model';
import { Direction, DirectionOut } from './model/direction.model';
import { Departure } from './model/departure.model';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) { }

//BUSES
  getAllBuses(): Observable<PagedResults<Bus>> {
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

  getWithRelations(busId: number): Observable<Bus> {
    return this.http.get<Bus>(environment.apiHost + 'bus/getWithRelations/' + busId);
  }

//LINES
  getAllLines(): Observable<PagedResults<Line>> {
    return this.http.get<PagedResults<Line>>(environment.apiHost + 'line/getAll');
  }

  createLine(line: Line): Observable<Line> {
    return this.http.post<Line>(environment.apiHost + 'line/create', line);
  }

  updateLine(line: Line): Observable<Line> {
    return this.http.put<Line>(environment.apiHost + 'line/update/' + line.id, line)
  }

  deleteLine(id: number): Observable<Line> {
    return this.http.delete<Line>(environment.apiHost + 'line/delete/' + id);
  }

  getByBusId(id: number): Observable<Line[]> {
    return this.http.get<Line[]>(environment.apiHost + 'line/getByBusId/' + id);
  }

  addBus(busId: number, lineId: number): Observable<LineOut> {
    return this.http.get<LineOut>(`${environment.apiHost}line/addBus/${busId}/${lineId}`);
  }

  removeBus(busId: number, lineId: number): Observable<LineOut> {
    return this.http.get<LineOut>(`${environment.apiHost}line/removeBus/${busId}/${lineId}`);
  }

  addStation(stationId: number, lineId: number): Observable<LineOut> {
    return this.http.get<LineOut>(`${environment.apiHost}line/addStation/${stationId}/${lineId}`);
  }

  removeStation(stationId: number, lineId: number): Observable<LineOut> {
    return this.http.get<LineOut>(`${environment.apiHost}line/removeStation/${stationId}/${lineId}`);
  }

  getLineWithRelations(lineId: number): Observable<LineOut> {
    return this.http.get<LineOut>(environment.apiHost + 'line/getWithRelations/' + lineId);
  }

  //STATIONS
  getAllStations(): Observable<PagedResults<Station>> {
    return this.http.get<PagedResults<Station>>(environment.apiHost + 'station/getAll');
  }

  createStation(station: Station): Observable<Station> {
    return this.http.post<Station>(environment.apiHost + 'station/create', station);
  }

  updateStation(station: Station): Observable<Station> {
    return this.http.put<Station>(environment.apiHost + 'station/update/' + station.id, station)
  }

  deleteStation(id: number): Observable<Station> {
    return this.http.delete<Station>(environment.apiHost + 'station/delete/' + id);
  }

  //LOCATIONS
  getAllLocations(): Observable<PagedResults<Location>> {
    return this.http.get<PagedResults<Location>>(environment.apiHost + 'location/getAll');
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(environment.apiHost + 'location/create', location);
  }

  updateLocation(location: Location): Observable<Location> {
    return this.http.put<Location>(environment.apiHost + 'location/update/' + location.id, location)
  }

  deleteLocation(id: number): Observable<Location> {
    return this.http.delete<Location>(environment.apiHost + 'location/delete/' + id);
  }

  //DIRECTIONS
  getDirection(directionId: number, lineId: number): Observable<Direction> {
    return this.http.get<Direction>(environment.apiHost + 'direction/get/' + directionId + '/' + lineId);
  }

  createDirection(direction: Direction): Observable<Direction> {
    return this.http.post<Direction>(environment.apiHost + 'direction/create', direction);
  }

  updateDirection(direction: Direction): Observable<Direction> {
    return this.http.put<Direction>(environment.apiHost + 'direction/update/' + direction.id, direction)
  }

  deleteDirection(directionId: number, lineId: number): Observable<Direction> {
    return this.http.delete<Direction>(`${environment.apiHost}direction/delete/${directionId}/${lineId}`);
  }

  getDirectionWithRelations(directionId: number): Observable<DirectionOut> {
    return this.http.get<DirectionOut>(environment.apiHost + 'direction/getWithRelations/' + directionId);
  }

  //DEPARTURES
  getAllDepartures(): Observable<PagedResults<Departure>> {
    return this.http.get<PagedResults<Departure>>(environment.apiHost + 'departure/getAll');
  }

  createDeparture(departure: Departure): Observable<Departure> {
    return this.http.post<Departure>(environment.apiHost + 'departure/create', departure);
  }

  updateDeparture(departure: Departure): Observable<Departure> {
    return this.http.put<Departure>(environment.apiHost + 'departure/update/' + departure.id, departure)
  }

  deleteDeparture(id: number): Observable<Departure> {
    return this.http.delete<Departure>(environment.apiHost + 'departure/delete/' + id);
  }
}
