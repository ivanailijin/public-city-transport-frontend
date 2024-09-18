import { Component, OnInit } from '@angular/core';
import { TransportService } from '../transport.service';
import { Router } from '@angular/router';
import { Line, LineType } from '../model/line.model';

@Component({
  selector: 'app-all-lines',
  templateUrl: './all-lines.component.html',
  styleUrls: ['./all-lines.component.css']
})
export class AllLinesComponent implements OnInit {

  constructor(private transportService: TransportService, private router: Router) {}

  lines: Line[] = [];

  ngOnInit(): void {
    this.transportService.getAllLines().subscribe(
      (result: any) => {
        this.lines = result.results;
        this.lines.sort((a: any, b: any) => {
          const nameA = parseFloat(a.name);
          const nameB = parseFloat(b.name);
  
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
    this.router.navigate(['create-line'])
  }

  public getLineTypeString(type: LineType): string {
    switch (type) {
      case LineType.city:
        return 'city';
      case LineType.suburban:
        return 'suburban';
      default:
        return 'city';
    }
  }
}
