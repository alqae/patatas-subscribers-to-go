import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromModels from '@app/models';
import * as fromStore from '@subscribers/store';
import * as fromStoreCore from '@core/store';

@Component({
  selector: 'app-detail-subscriptor',
  templateUrl: './detail-subscriptor.component.html',
  styleUrls: ['./detail-subscriptor.component.scss']
})
export class DetailSubscriptorComponent implements OnInit, OnDestroy {
  subscriptorId: string | null = null;
  subscriptor?: fromModels.Subscriptor;

  isEditing = false;
  updateSubscriptorForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _storeSubscribers: Store<fromStore.SubscribersState>,
  ) {
    this.updateSubscriptorForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Country: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Area: new FormControl('', [Validators.required]),
      JobTitle: new FormControl('', [Validators.required]),
    });

    this._storeSubscribers.select(fromStore.getSubscriptor)
      .subscribe((subscriptor) => {
        if (subscriptor && subscriptor.Id.toString() === this.subscriptorId) {
          this.subscriptor = subscriptor;
        }
      }
    );
  }

  ngOnInit(): void {
    this.subscriptorId = this.route.snapshot.paramMap.get('id');
    if (this.subscriptorId) {
      this._storeSubscribers.dispatch(new fromStore.GetSubscriptor(Number(this.subscriptorId)));
    }
  }

  ngOnDestroy(): void {
    this._storeSubscribers.dispatch(new fromStore.ClearSubscriptor());
  }

  DeleteSubscriptor() {
    if (this.subscriptorId) {
      this._storeSubscribers.dispatch(new fromStore.DeleteSubscriptor(Number(this.subscriptorId)));
    }
  }

  goBack() {
    this._storeSubscribers.dispatch(new fromStoreCore.Go({ path: ['subscribers'] }));
  }

  edit() {
    this.isEditing = true;
    this.updateSubscriptorForm.patchValue({
      Name: this.subscriptor?.Name,
      Email: this.subscriptor?.Email,
      Country: this.subscriptor?.CountryCode,
      PhoneNumber: this.subscriptor?.PhoneNumber,
      Area: this.subscriptor?.Area,
      JobTitle: this.subscriptor?.JobTitle,
    });
  }

  reset() {
    this.isEditing = false;
    this.updateSubscriptorForm.reset();
  }

  save() {
    if (this.updateSubscriptorForm.dirty && this.updateSubscriptorForm.valid) {
      this._storeSubscribers.dispatch(new fromStore.UpdateSubscriptor({
        Id: Number(this.subscriptorId),
        Name: this.updateSubscriptorForm.value.Name,
        Email: this.updateSubscriptorForm.value.Email,
        CountryCode: this.updateSubscriptorForm.value.Country,
        PhoneNumber: this.updateSubscriptorForm.value.PhoneNumber,
        Area: this.updateSubscriptorForm.value.Area,
        JobTitle: this.updateSubscriptorForm.value.JobTitle,
        Topics: [],
      }));

      this.reset();
    }
  }

  getField(field: string): FormControl {
    return this.updateSubscriptorForm.get(field) as FormControl;
  }
}
