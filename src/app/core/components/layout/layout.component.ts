import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import * as fromStoreLogin from '@login/store';
import * as fromStoreShared from '@shared/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private _storeLogin: Store<fromStoreLogin.LoginState>,
    private _storeShared: Store<fromStoreShared.SharedState>,
    private _translate: TranslateService,
  ) {
    this._storeShared.select(fromStoreShared.getLanguage)
      .subscribe((language) => this._translate.setDefaultLang(language));
    this.isLoggedIn$ = this._storeLogin.select(fromStoreLogin.getLoggedIn);
  }


  logout() {
    this._storeLogin.dispatch(new fromStoreLogin.Logout());
  }

  setLanguage(lang: string) {
    this._storeShared.dispatch(new fromStoreShared.setLanguage(lang));
  }
}
