import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBusFormComponent } from './create-bus-form/create-bus-form.component';
import { CreateLineFormComponent } from './create-line-form/create-line-form.component';
import { CreateStationFormComponent } from './create-station-form/create-station-form.component';
import { AllBusesComponent } from './all-buses/all-buses.component';
import { AllStationsComponent } from './all-stations/all-stations.component';
import { AllLinesComponent } from './all-lines/all-lines.component';



@NgModule({
  declarations: [
    CreateBusFormComponent,
    CreateLineFormComponent,
    CreateStationFormComponent,
    AllBusesComponent,
    AllStationsComponent,
    AllLinesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TransportModule { }
