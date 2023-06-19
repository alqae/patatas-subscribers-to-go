import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import * as fromModels from '@app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private _url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this._url = environment.apiUrl;
  }

  getSubscribers(query: fromModels.Filter): Observable<fromModels.IResponse<fromModels.Subscriber[]>> {
    const params = new HttpParams({
      fromObject: {
        criteria: query.criteria ? query.criteria : '',
        page: query.page ? query.page : 1,
        count: query.count ? query.count : 10,
        ...{ ...query.sortOrder ? { sortOrder: query.sortOrder } : {} },
        sortType: query.sortType ? query.sortType : 0,
      }
    });
    return this._http.get<fromModels.IResponse<fromModels.Subscriber[]>>(`${this._url}/subscribers`, { params });
  }

  getSubscriber(subscriberId: number): Observable<fromModels.Subscriber> {
    return this._http.get<fromModels.Subscriber>(`${this._url}/subscribers/${subscriberId}`);
  }

  createSubscriber(subscriber: { Subscribers: fromModels.Subscriber[] }): Observable<fromModels.IResponse<string>> {
    return this._http.post<fromModels.IResponse<string>>(`${this._url}/subscribers`, subscriber);
  }

  updateSubscriber(subscriber: Partial<fromModels.Subscriber>): Observable<fromModels.IResponse<string>> {
    return this._http.put<fromModels.IResponse<string>>(`${this._url}/subscribers/${subscriber.Id}`, subscriber);
  }

  deleteSubscriber(subscriberId: number): Observable<fromModels.IResponse<string>> {
    return this._http.delete<fromModels.IResponse<string>>(`${this._url}/subscribers/${subscriberId}`);
  }
}
