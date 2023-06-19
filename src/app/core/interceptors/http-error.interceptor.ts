import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import * as fromStoreLogin from '@login/store';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  UNAUTHORIZED_CODE = 401;
  UNAUTHORIZED_MESSAGE = 'Your session has expired. Please login again.';

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }

          if (error.status === this.UNAUTHORIZED_CODE) {
            this._storeLogin.dispatch(new fromStoreLogin.Logout());
            return throwError(this.UNAUTHORIZED_MESSAGE);
          }

          console.log(errorMsg);
          return throwError(error);
        })
      )
  }

  constructor(private _storeLogin: Store<fromStoreLogin.LoginState>) { }
}
