import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStoreSubscriber from '@subscribers/store';
import * as fromStoreCore from '@core/store';
import * as fromModels from '@app/models';

@Component({
  selector: 'app-all-subscribers',
  templateUrl: './all-subscribers.component.html',
  styleUrls: ['./all-subscribers.component.scss']
})
export class AllSubscribersComponent {
  isLoading$: Observable<boolean>;

  displayedColumns: string[] = ['Id', 'Name', 'Area','Email' ,'SubscriptionStateDescription', 'actions'];

  pageSize = 10;
  pageIndex = 0;
  sortOrder!: string;
  sortType!: number;
  pageSizeOptions = [5, 10, 25];

  searchControl = new FormControl('');
  
  totalSubscribers = 0;
  subscribers: fromModels.Subscriber[] = [];

  dataSource = new MatTableDataSource(this.subscribers);

  constructor(
    private _storeSubscriber: Store<fromStoreSubscriber.SubscribersState>,
  ) {
    this.isLoading$ = this._storeSubscriber.select(fromStoreSubscriber.getLoading);
    this._storeSubscriber.dispatch(new fromStoreSubscriber.GetSubscribers({
      count: this.pageSize,
      page: this.pageIndex + 1,
    }));
    this._storeSubscriber.select(fromStoreSubscriber.getTotalSubscribers)
      .subscribe((totalSubscribers) => this.totalSubscribers = totalSubscribers);
    this._storeSubscriber.select(fromStoreSubscriber.getSubscribers)
      .subscribe((subscribers) => {
        this.subscribers = subscribers;
        this.dataSource.data = subscribers;
      });

    this.searchControl.valueChanges
      .subscribe((value) => {
        this._storeSubscriber.dispatch(new fromStoreSubscriber.GetSubscribers(this.getFilters()));
      });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this._storeSubscriber.dispatch(new fromStoreSubscriber.GetSubscribers(this.getFilters()));
  }

  announceSortChange(event: Sort) {
    this.sortOrder = event.active;
    this.sortType = event.direction === 'asc' ? 1 : 0;
    this._storeSubscriber.dispatch(new fromStoreSubscriber.GetSubscribers(this.getFilters()));
  }

  deleteSubscriber(subscriberId: number) {
    this._storeSubscriber.dispatch(new fromStoreSubscriber.DeleteSubscriber(subscriberId));
  }

  goToDetail(subscriberId: number) {
    return this._storeSubscriber.dispatch(new fromStoreCore.Go({  path: ['subscribers', subscriberId] }))
  }

  goToCreate() {
    return this._storeSubscriber.dispatch(new fromStoreCore.Go({  path: ['subscribers', 'create'] }))
  }

  getFilters(): fromModels.Filter {
    const filters: fromModels.Filter = {
      count: this.pageSize,
      page: this.pageIndex + 1,
    };

    if (this.searchControl.value) {
      filters.criteria = this.searchControl.value;
    }

    if (this.sortOrder) {
      filters.sortOrder = this.sortOrder;
    }

    if (this.sortType) {
      filters.sortType = this.sortType;
    }

    return filters;
  }
}
