import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseMapComponent } from './base-map/base-map.component';



@NgModule({
  declarations: [BaseMapComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BaseMapComponent
  ]
})
export class MapModule { }
