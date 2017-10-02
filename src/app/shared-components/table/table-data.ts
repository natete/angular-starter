import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PageEvent } from '@angular/material';

export class TableData {

  dataChange: BehaviorSubject<any[]>;
  page: PageEvent;

  get data(): any[] { return this.dataChange.value; }

  constructor(dataChange: BehaviorSubject<any[]>, page: PageEvent) {
    this.dataChange = dataChange;
    this.page = page;
  }
}
