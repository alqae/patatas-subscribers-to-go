import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { environment } from '@environments/environment';

import * as fromModels from '@app/models';
import * as fromServicesShared from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class SubscriptorService {
  private _url: string;

  constructor(
    private _http: HttpClient,
    private _utils: fromServicesShared.UtilsService
  ) {
    this._url = environment.apiUrl;
  }

  GetSubscriptors(query: fromModels.Filter): Observable<fromModels.IResponse<fromModels.Subscriptor[]>> {
    const params = new HttpParams({
      fromObject: {
        criteria: query.criteria ? query.criteria : '',
        page: query.page ? query.page : 1,
        count: query.count ? query.count : 10,
        ...{ ...query.sortOrder ? { sortOrder: query.sortOrder } : {} },
        sortType: query.sortType ? query.sortType : 0,
      }
    });
    return this._http.get<fromModels.IResponse<fromModels.Subscriptor[]>>(`${this._url}/subscribers`, { params });
  }

  GetSubscriptor(subscriberId: number): Observable<fromModels.Subscriptor> {
    return this._http.get<fromModels.Subscriptor>(`${this._url}/subscribers/${subscriberId}`)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  CreateSubscriptor(subscriptor: { Subscribers: fromModels.Subscriptor[] }): Observable<fromModels.IResponse<string>> {
    return this._http.post<fromModels.IResponse<string>>(`${this._url}/subscribers`, subscriptor)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  UpdateSubscriptor(subscriptor: Partial<fromModels.Subscriptor>): Observable<fromModels.IResponse<string>> {
    return this._http.put<fromModels.IResponse<string>>(`${this._url}/subscribers/${subscriptor.Id}`, subscriptor)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }

  DeleteSubscriptor(subscriberId: number): Observable<fromModels.IResponse<string>> {
    return this._http.delete<fromModels.IResponse<string>>(`${this._url}/subscribers/${subscriberId}`)
      .pipe(
        catchError(this._utils.handleErrorHttp)
      );
  }
}
