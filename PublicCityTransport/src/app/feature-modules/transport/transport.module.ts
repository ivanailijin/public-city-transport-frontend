import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBusFormComponent } from './create-bus-form/create-bus-form.component';
import { CreateLineFormComponent } from './create-line-form/create-line-form.component';
import { CreateStationFormComponent } from './create-station-form/create-station-form.component';
import { LineViewComponent } from './line-view/line-view.component';



@NgModule({
  declarations: [
    CreateBusFormComponent,
    CreateLineFormComponent,
    CreateStationFormComponent,
    LineViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TransportModule { }
