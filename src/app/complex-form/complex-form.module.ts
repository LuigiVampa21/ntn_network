import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexFormRoutingModule } from './complex-form-routing.module';
import { ComplexFormComponent } from './components/complex-form/complex-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ComplexFormComponent
  ],
  imports: [
    CommonModule,
    ComplexFormRoutingModule,
    SharedModule
  ]
})
export class ComplexFormModule { }
