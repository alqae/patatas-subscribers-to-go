import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import * as fromModels from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _url: String;

  constructor(private _http: HttpClient) {
    this._url = environment.apiUrl;
  }

  login(userToLogin: fromModels.Authenticate) {
    return this._http.post(`${this._url}/account/login`, userToLogin);
  }
}
