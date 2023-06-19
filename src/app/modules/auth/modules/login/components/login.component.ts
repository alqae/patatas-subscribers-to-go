import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStoreLogin from '../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private _storeLogin: Store<fromStoreLogin.LoginState>,
  ) {
    this.loginForm = new FormGroup({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  getField(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }

  submit() {
    if (this.loginForm.valid && this.loginForm.dirty) {
      this._storeLogin.dispatch(new fromStoreLogin.Login(this.loginForm.value));
    }
  }
}
