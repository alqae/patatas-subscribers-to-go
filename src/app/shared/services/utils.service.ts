import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

import { DialogComponent } from '../components/dialog/dialog.component';
import { environment } from '@environments/environment';
import * as fromModels from '@app/models';

@Injectable()
export class UtilsService {
  private _url: string;

  constructor(
    private _http: HttpClient,
    private dialog: MatDialog,
  ) {
    this._url = environment.apiUrl;
  }

  handleErrorHttp(response: HttpErrorResponse) {
    if (response.error instanceof ErrorEvent || response.error !== null) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', response.error.message);
      return throwError(response.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${response.status}, ` +
        `body was: ${response.error}`);
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }
  }

  showDialog(settings: MatDialogConfig<{
    title: string,
    message: string,
    onConfirm?: () => void,
  }>): void {
    const dialogRef = this.dialog.open(DialogComponent, settings);
    dialogRef.afterClosed().subscribe(result => {
      if (result && settings.data?.onConfirm) {
        settings.data.onConfirm();
      }
    });
  }

  getItemLocalStorage(key: string) {
    const storageVal: any = localStorage.getItem(key);
    try {
      return JSON.parse(storageVal);
    } catch (error) {
      return storageVal;
    }
  }

  getCountries(query: fromModels.Filter): Observable<fromModels.IResponse<fromModels.Country[]>> {
    const params = new HttpParams({
      fromObject: {
        page: query.page ? query.page : 1,
        count: query.count ? query.count : 10,
        criteria: query.criteria ? query.criteria : '',
        sortType: query.sortType ? query.sortType : 0,
      }
    });
    return this._http.get<fromModels.IResponse<fromModels.Country[]>>(`${this._url}/countries`, { params });
      // .pipe(
      //   catchError(this.handleErrorHttp)
      // );
  }

  // getCitiesOfCountry(country: string) {
  //   return this._http.get(`${this._url}cities-by/${country}`)
  //     // .pipe(
  //     //   catchError(this.handleErrorHttp)
  //     // );
  // }

  renderErrors(errors: any) {
    let template = `<p class="mt-10"><strong>Errores:</strong>`;
    template += `<ul class="mt-10">`;
    errors.forEach((error: any) => {
      template += `<li><p>${error[0]}</p></li>`;
    });
    template += `</ul>`;
    return template;
  }

  getFormValidationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: any = form.get(key)?.errors;
      console.log(key);
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
