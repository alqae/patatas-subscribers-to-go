import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromReducers from './reducers/subscribers.reducer';
import * as fromEffects from './effects/subscribers.effects';
import * as fromServices from '../services';

@NgModule({
  imports: [
    StoreModule.forFeature('subscribers', fromReducers.SubscribersReducer),
    EffectsModule.forFeature([fromEffects.SubscribersEffects]),
  ],
  providers: [...fromServices.services]
})
export class SubscribersStoreModule { }
