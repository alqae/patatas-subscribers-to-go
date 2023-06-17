import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '@app/shared';

import * as fromInterceptors from './interceptors';
import * as fromComponents from './components';
import * as fromStore from './store';

@NgModule({
  declarations: [
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    SharedModule,
    fromStore.CoreStoreModule,
    CoreRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.JwtInterceptor, multi: true },
  ]
})
export class CoreModule { }
