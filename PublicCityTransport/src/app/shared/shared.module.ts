import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule
  ],
  exports: [
    MapComponent
  ]
})
export class SharedModule { }
