import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@core/core.module';
import * as fromComponents from '@core/components';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  bootstrap: [fromComponents.LayoutComponent]
})
export class AppModule { }
