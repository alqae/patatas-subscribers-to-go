import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
