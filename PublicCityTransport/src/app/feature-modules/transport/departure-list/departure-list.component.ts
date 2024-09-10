import { Component, Input, OnInit } from '@angular/core';
import { DirectionOut } from '../model/direction.model';
import { Departure } from '../model/departure.model';

@Component({
  selector: 'app-departure-list',
  templateUrl: './departure-list.component.html',
  styleUrls: ['./departure-list.component.css']
})
export class DepartureListComponent implements OnInit{

  @Input() direction?: DirectionOut;

  directionShow: DirectionOut = {
    id: 0,
    name: '',
    firstStation: '',
    lineId: 0,
    line: {
      id: 0,
      name: '',
      lineType: 0,
      length: 0,
      time: 0
    },
    departures: []
  };

  departures: Departure[] = [];
  workdayDepartures: Departure[] = [];
  saturdayDepartures: Departure[] = [];
  sundayDepartures: Departure[] = [];

  ngOnInit(): void {
    if(this.direction)
    this.departures = this.direction.departures.map(departure => ({
      ...departure,
      time: departure.time.slice(0, 5) 
    }));
    this.getWorkdayDepartures();
    this.getSaturdayDepartures();
    this.getSundayDepartures();
  }

  getWorkdayDepartures(): void {
    this.workdayDepartures = this.departures
      .filter(departure => departure.day === 'Workday')
      .sort((a, b) => this.compareTimes(a.time, b.time));
  }

  getSaturdayDepartures(): void {
    this.saturdayDepartures = this.departures
      .filter(departure => departure.day === 'Saturday')
      .sort((a, b) => this.compareTimes(a.time, b.time));
  }

  getSundayDepartures(): void {
    this.sundayDepartures = this.departures
      .filter(departure => departure.day === 'Sunday')
      .sort((a, b) => this.compareTimes(a.time, b.time));
  }
  
  compareTimes(time1: string, time2: string): number {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);

    if (hour1 !== hour2) {
      return hour1 - hour2;
    }
    return minute1 - minute2;
  }
}
