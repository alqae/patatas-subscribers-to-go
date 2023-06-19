import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStore from '@subscribers/store';
import * as fromStoreCore from '@core/store';

@Component({
  selector: 'app-create-subscriber',
  templateUrl: './create-subscriber.component.html',
  styleUrls: ['./create-subscriber.component.scss']
})
export class CreateSubscriberComponent {
  subscriptorsForm = new FormArray<FormGroup>([]);

  constructor(
    private _store: Store<fromStore.SubscribersState>,
  ) {
    this.addSubscriptor();
  }

  save(subscriptorForm: FormGroup) {
    if (subscriptorForm.valid && subscriptorForm.dirty) {
      this._store.dispatch(new fromStore.CreateSubscriber({
        Subscribers: [
          {
            ...subscriptorForm.value,
            Topics: [],
          }
        ]
      }));

      this.subscriptorsForm.removeAt(this.subscriptorsForm.controls.indexOf(subscriptorForm));

      if (this.subscriptorsForm.controls.length === 0) {
        this.addSubscriptor();
      }
    }
  }

  saveAll() {
    if (this.subscriptorsForm.valid && this.subscriptorsForm.dirty) {
      this._store.dispatch(new fromStore.CreateSubscriber({
        Subscribers: this.subscriptorsForm.value.map(subscriptor => ({
          ...subscriptor,
          Topics: [],
        }))
      }));

      this.goBack();
    }
  }

  goBack() {
    this._store.dispatch(new fromStoreCore.Go({ path: ['/subscribers'] }));
  }

  getField(subscriptorForm: FormGroup, field: string): FormControl {
    return subscriptorForm.get(field) as FormControl;
  }

  addSubscriptor() {
    this.subscriptorsForm.push(this.generateSubscriptorForm());
  }

  removeSubscriptor(subscriptorForm: FormGroup) {
    this.subscriptorsForm.removeAt(this.subscriptorsForm.controls.indexOf(subscriptorForm));
  }

  generateSubscriptorForm(): FormGroup {
    return new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Country: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      JobTitle: new FormControl('', [Validators.required]),
      Area: new FormControl('', [Validators.required]),
    });
  }
}
