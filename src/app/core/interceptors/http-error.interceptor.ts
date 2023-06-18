import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStoreLogin from '@login/store';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

          if (error.status === 401) {
            this._storeLogin.dispatch(new fromStoreLogin.Logout());
            return throwError('Your session has expired. Please login again.');
          }

          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }

  constructor(
    private _storeLogin: Store<fromStoreLogin.LoginState>,
  ) {}
}
