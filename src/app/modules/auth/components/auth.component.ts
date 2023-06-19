import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStoreLogin from '@login/store';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public isLoading$: Observable<boolean>;

  constructor(
    private _storeLogin: Store<fromStoreLogin.LoginState>,
  ) {
    this.isLoading$ = this._storeLogin.select(fromStoreLogin.getLoading);
  }
}
