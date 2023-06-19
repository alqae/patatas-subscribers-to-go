import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromReducers from './reducers/shared.reducer';
import * as fromEffects from './effects/shared.effects';
import * as fromServices from '../services';

@NgModule({
  imports: [
    StoreModule.forFeature('shared', fromReducers.SharedReducer),
    EffectsModule.forFeature([fromEffects.SharedEffects]),
  ],
  providers: [
    ...fromServices.services,
  ]
})
export class SharedStoreModule { }
