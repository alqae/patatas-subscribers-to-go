import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';

import * as fromServices from './services';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ...fromServices.services,
  ]
})
export class SharedModule { }
