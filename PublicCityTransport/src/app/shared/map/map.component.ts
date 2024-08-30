import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'xp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  private map: any;
  @Output() longitude: EventEmitter<number> = new EventEmitter<number>();
  @Output() latitude: EventEmitter<number> = new EventEmitter<number>();

  private markers: L.Marker[] = [];

  constructor() { }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    const redIcon = L.icon({
      iconUrl: 'https://icons.veryicon.com/png/System/Small%20%26%20Flat/map%20marker.png',
      iconSize: [31, 41],
      iconAnchor: [13, 41],
    });

    //const marker = new L.Marker([this.company.address.latitude, this.company.address.longitude], { icon: redIcon }).addTo(this.map);

    //this.markers.push(marker);

    tiles.addTo(this.map);
    this.registerOnClick();
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;

      this.latitude.emit(lat);
      this.longitude.emit(lng);

      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      this.clearMarkers();

      const redIcon = L.icon({
        iconUrl: 'https://icons.veryicon.com/png/System/Small%20%26%20Flat/map%20marker.png',
        iconSize: [31, 41],
        iconAnchor: [13, 41],
      });

      const marker = new L.Marker([lat, lng], { icon: redIcon }).addTo(this.map);
      this.markers.push(marker);
    });
  }

  clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['company'] && !changes['company.firstChange']) {
  //     this.resetMap();
  //     this.initMap();
  //   }
  // }

  resetMap(): void {
    if (this.map) {
      this.map.remove();
    }

    this.markers = [];
  }

  ngOnDestroy(): void {
    this.resetMap();
  }
}
