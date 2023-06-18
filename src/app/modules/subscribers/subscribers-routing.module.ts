import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromComponents from './components';

const routes: Routes = [
  { path: '', component: fromComponents.AllSubscribersComponent },
  { path: ':id', component: fromComponents.DetailSubscriberComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
