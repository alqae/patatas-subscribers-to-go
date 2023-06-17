import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromReducers from './reducers/login.reducer';
import * as fromEffects from './effects/login.effects';
import * as fromServices from '../services';

@NgModule({
  imports: [
    StoreModule.forFeature('login', fromReducers.LoginReducer),
    EffectsModule.forFeature([fromEffects.LoginEffects]),
  ],
  providers: [fromServices.LoginService]
})
export class LoginStoreModule { }
