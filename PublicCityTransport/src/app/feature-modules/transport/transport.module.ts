import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBusFormComponent } from './create-bus-form/create-bus-form.component';
import { CreateLineFormComponent } from './create-line-form/create-line-form.component';
import { CreateStationFormComponent } from './create-station-form/create-station-form.component';
import { AllBusesComponent } from './all-buses/all-buses.component';
import { AllStationsComponent } from './all-stations/all-stations.component';
import { AllLinesComponent } from './all-lines/all-lines.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusProfileComponent } from './bus-profile/bus-profile.component';
import { LineProfileComponent } from './line-profile/line-profile.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    CreateBusFormComponent,
    CreateLineFormComponent,
    CreateStationFormComponent,
    AllBusesComponent,
    AllStationsComponent,
    AllLinesComponent,
    BusProfileComponent,
    LineProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TransportModule { }
