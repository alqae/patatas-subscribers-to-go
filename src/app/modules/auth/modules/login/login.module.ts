import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components';
import { SharedModule } from '@app/shared';
import * as fromServices from './services';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ...fromServices.services,
  ]
})
export class LoginModule { }
