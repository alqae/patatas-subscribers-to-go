import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';

import * as fromStoreLogin from '@login/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;

  public isLoggedIn = false;

  constructor(
    private _storeLogin: Store<fromStoreLogin.LoginState>,
  ) {
    this._storeLogin.select(fromStoreLogin.getLoggedIn)
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  logout() {
    this._storeLogin.dispatch(new fromStoreLogin.Logout());
  }

  clickHandler() {
    this.sidenav?.close();
  }
}
