import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpClient } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components';
import { SharedModule } from '@app/shared';

// const translateLoader = (http: HttpClient) => {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (translateLoader),
    //     deps: [HttpClient]
    //   }
    // }),
    AuthRoutingModule
  ]
})
export class AuthModule {
}
