import { Component, OnInit } from '@angular/core';
import { TransportService } from '../transport.service';
import { Bus } from '../model/bus.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-buses',
  templateUrl: './all-buses.component.html',
  styleUrls: ['./all-buses.component.css']
})
export class AllBusesComponent implements OnInit{

  constructor(private transportService: TransportService, private router: Router) {}

  buses: Bus[] = [];

  ngOnInit(): void {
    this.transportService.getAllBuses().subscribe(
      (result: any) => {
        this.buses = result.results;
        console.log(this.buses)
        this.buses.sort((a: any, b: any) => {
          const nameA = parseFloat(a.yearOfProduction);
          const nameB = parseFloat(b.yearOfProduction);
  
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
    )
  }

  navigateToCreate(){
    this.router.navigate(['create-bus'])
  }
}
