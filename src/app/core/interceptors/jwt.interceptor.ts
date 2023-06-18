import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromStoreLogin from '@login/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private token$: Observable<any>;
  private _token: string = '';

  /**
   * Método ejecutado con cada petición Http
   * @param req HttpRequest
   * @param next HttpHandler
   * @return Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
  HttpHeaderResponse |
  HttpProgressEvent |
  HttpResponse<any> |
  HttpUserEvent<any>> {
    // build the headers you want
    let headers: any = {
      'Content-Type': 'application/json',
    };

    if (!req.url.includes('login')) {
      headers['authorization'] = `Bearer ${this._token.trim()}`;
    }

    // clone the request
    const clone = req.clone({ setHeaders: headers });

    // pass it to the next interceptor
    return next.handle(clone);
  }

  constructor(
    private _storeLogin: Store<fromStoreLogin.LoginState>,
  ) {
    this.token$ = this._storeLogin.pipe(select(fromStoreLogin.getToken));
    this.token$.subscribe((token: string) => this._token = token);
  }
}
