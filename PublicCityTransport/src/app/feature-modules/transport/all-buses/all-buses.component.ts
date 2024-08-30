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
    this.transportService.getAll().subscribe(
      (result: any) => {
        this.buses = result.results;
        console.log(this.buses)
      }
    )
  }

  navigateToCreate(){
    this.router.navigate(['create-bus'])
  }
}
