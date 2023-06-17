import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './components';

const routes: Routes = [
  {
    path: '',
    // canActivate: [LoggedOutGuard],
    loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
