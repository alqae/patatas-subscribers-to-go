import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';

import * as fromServices from './services';
import * as fromComponents from './components';

@NgModule({
  declarations: [
    ...fromComponents.components,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ...fromComponents.components,
  ],
  providers: [
    ...fromServices.services,
  ]
})
export class SharedModule { }
