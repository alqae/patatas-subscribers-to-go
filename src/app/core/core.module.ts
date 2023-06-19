import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '@app/shared';

import * as fromInterceptors from './interceptors';
import * as fromComponents from './components';
import * as fromStore from './store';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    SharedModule,
    fromStore.CoreStoreModule,
    CoreRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
  ],
  exports: [
    ...fromComponents.components
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.HttpErrorInterceptor, multi: true },
  ]
})
export class CoreModule { }
