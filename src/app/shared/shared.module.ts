import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './material/material.module';

import * as fromComponents from './components';
import * as fromServices from './services';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './config/LibraryConfig';

const translateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateLoader),
        deps: [HttpClient]
      },
    }),
  ],
  exports: [
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ...fromComponents.components,
    TranslateModule,
  ],
  providers: [
    ...fromServices.services,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class SharedModule { }
