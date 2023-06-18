import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromModels from '@app/models';
import * as fromStore from '@subscribers/store';
import * as fromStoreCore from '@core/store';
import * as fromServicesShared from '@shared/services';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-subscriber',
  templateUrl: './detail-subscriber.component.html',
  styleUrls: ['./detail-subscriber.component.scss']
})
export class DetailSubscriberComponent implements OnInit, OnDestroy {
  subscriberId: string | null = null;
  subscriber?: fromModels.Subscriber;
  
  // Countries
  countries: fromModels.Country[] = [];
  currentPageCountries = 1;
  filterCountriesControl = new FormControl('');
  totalCountries = 0;
  
  isEditing = false;
  subscriberForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _store: Store<fromStore.SubscribersState>,
    private _utilsService: fromServicesShared.UtilsService,
  ) {
    this.getCountries();

    this.filterCountriesControl.valueChanges.subscribe((value) => {
      this.currentPageCountries = 1;
      if (value) {
        this.getCountries(value);
      }
    });

    this.subscriberForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Country: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Area: new FormControl('', [Validators.required]),
      JobTitle: new FormControl('', [Validators.required]),
    });

    this._store.select(fromStore.getSubscriber)
      .subscribe((subscriber) => {
        if (subscriber) {
          this.subscriber = subscriber;
        }
      }
    );
  }

  ngOnInit(): void {
    this.subscriberId = this.route.snapshot.paramMap.get('id');
    if (this.subscriberId) {
      this._store.dispatch(new fromStore.GetSubscriber(Number(this.subscriberId)));
    }
  }

  ngOnDestroy(): void {
    this._store.dispatch(new fromStore.ClearSubscriber());
  }

  deleteSubscriber() {
    if (this.subscriberId) {
      this._store.dispatch(new fromStore.DeleteSubscriber(Number(this.subscriberId)));
    }
  }

  goBack() {
    this._store.dispatch(new fromStoreCore.Go({ path: ['subscribers'] }));
  }

  edit() {
    this.isEditing = true;
    this.subscriberForm.patchValue({
      Name: this.subscriber?.Name,
      Email: this.subscriber?.Email,
      Country: this.subscriber?.CountryCode,
      PhoneNumber: this.subscriber?.PhoneNumber,
      Area: this.subscriber?.Area,
      JobTitle: this.subscriber?.JobTitle,
    });
  }

  reset() {
    this.isEditing = false;
    this.filterCountriesControl.reset();
    this.subscriberForm.reset();
  }

  save() {
    if (this.subscriberForm.dirty && this.subscriberForm.valid) {
      this._store.dispatch(new fromStore.UpdateSubscriber({
        Id: Number(this.subscriberId),
        Name: this.subscriberForm.value.Name,
        Email: this.subscriberForm.value.Email,
        CountryCode: this.subscriberForm.value.Country,
        PhoneNumber: this.subscriberForm.value.PhoneNumber,
        Area: this.subscriberForm.value.Area,
        JobTitle: this.subscriberForm.value.JobTitle,
        Topics: [],
      }));
    }
  }

  getCountries(criteria?: string) {
    this._utilsService.getCountries({ criteria, page: this.currentPageCountries })
      .subscribe((response) => {
        this.totalCountries = response.Count;
        this.countries = response.Data;
      });
  }

  getNextCountries() {
    this._utilsService.getCountries({ page: this.currentPageCountries + 1 })
      .subscribe((response) => {
        this.totalCountries = response.Count;
        this.countries = [...this.countries, ...response.Data];
        this.currentPageCountries++;
      });
  }

  getField(field: string): AbstractControl | null {
    return this.subscriberForm.get(field);
  }
}
