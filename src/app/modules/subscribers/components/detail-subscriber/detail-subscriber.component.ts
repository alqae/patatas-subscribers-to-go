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

  isEditing = false;
  updateSubscriberForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _store: Store<fromStore.SubscribersState>,
    private _utilsService: fromServicesShared.UtilsService,
  ) {
    this.updateSubscriberForm = new FormGroup({
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
    this.updateSubscriberForm.patchValue({
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
    this.updateSubscriberForm.reset();
  }

  save() {
    if (this.updateSubscriberForm.dirty && this.updateSubscriberForm.valid) {
      this._store.dispatch(new fromStore.UpdateSubscriber({
        Id: Number(this.subscriberId),
        Name: this.updateSubscriberForm.value.Name,
        Email: this.updateSubscriberForm.value.Email,
        CountryCode: this.updateSubscriberForm.value.Country,
        PhoneNumber: this.updateSubscriberForm.value.PhoneNumber,
        Area: this.updateSubscriberForm.value.Area,
        JobTitle: this.updateSubscriberForm.value.JobTitle,
        Topics: [],
      }));

      this.reset();
    }
  }

  getField(field: string): FormControl {
    return this.updateSubscriberForm.get(field) as FormControl;
  }
}
