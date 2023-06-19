import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SharedModule } from '@app/shared';

import * as fromComponents from './components';

@NgModule({
  declarations: [
    ...fromComponents.components,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SubscribersRoutingModule
  ]
})
export class SubscribersModule { }
