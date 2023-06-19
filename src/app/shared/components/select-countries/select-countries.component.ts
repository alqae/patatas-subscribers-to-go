import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as fromServicesShared from '@shared/services';
import * as fromModels from '@app/models';

@Component({
  selector: 'app-select-countries',
  templateUrl: './select-countries.component.html',
  styleUrls: ['./select-countries.component.scss']
})
export class SelectCountriesComponent {
  countries: fromModels.Country[] = [];
  currentPageCountries = 1;
  filterCountriesControl = new FormControl('');
  totalCountries = 0;

  @Input() control!: FormControl;

  constructor(
    private _utilsService: fromServicesShared.UtilsService,
  ) {
    this.getCountries();

    this.filterCountriesControl.valueChanges.subscribe((value) => {
      this.currentPageCountries = 1;
      if (value) {
        this.getCountries(value);
      }
    });

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
}
