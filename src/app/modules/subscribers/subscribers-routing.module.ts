import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromComponents from './components';

const routes: Routes = [
  { path: '', component: fromComponents.AllSubscribersComponent },
  { path: 'create', component: fromComponents.CreateSubscriptorComponent },
  { path: ':id', component: fromComponents.DetailSubscriptorComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
