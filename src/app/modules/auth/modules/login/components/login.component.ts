import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services';
import { Store } from '@ngrx/store';

import * as fromStoreLogin from '../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private _storeLogin: Store<fromStoreLogin.LoginState>,
  ) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this._storeLogin.dispatch(new fromStoreLogin.Login(this.form.value));
    }
  }
}
