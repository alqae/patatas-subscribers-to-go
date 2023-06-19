import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, map, takeUntil, tap } from 'rxjs';

import * as fromStoreShared from '../store';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  OF_LABEL = 'of';

  constructor(
    private _translate: TranslateService
  ) {
    super();
    this.getAndInitTranslations();
    this._translate.onLangChange
      .subscribe(() => this.getAndInitTranslations())
  }

  getAndInitTranslations() {
    this._translate
      .get([
        'paginator.itemsPerPageLabel',
        'paginator.nextPageLabel',
        'paginator.previousPageLabel',
        'paginator.ofLabel',
      ]).subscribe(translation => {
          this.itemsPerPageLabel =
            translation['paginator.itemsPerPageLabel'];
          this.nextPageLabel = translation['paginator.nextPageLabel'];
          this.previousPageLabel =
            translation['paginator.previousPageLabel'];
          this.OF_LABEL = translation['paginator.ofLabel'];
          this.changes.next();
        })
  }

  
  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${
      this.OF_LABEL
    } ${length}`;
  };
}
