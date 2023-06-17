import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromComponents from './components';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuards.userNotAuthenticathedGuard],
    loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'subscribers',
    canActivate: [fromGuards.userAuthenticathedGuard],
    loadChildren: () => import('src/app/modules/subscribers/subscribers.module').then(m => m.SubscribersModule)
  },
  { path: '**', component: fromComponents.ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
