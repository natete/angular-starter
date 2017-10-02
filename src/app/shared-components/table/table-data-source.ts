import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { TableData } from './table-data';
import 'rxjs/add/observable/merge';

export class TableDataSource extends DataSource<any> {

  constructor(private dataSource: TableData) {
    super();
  }

  connect(): Observable<any[]> {

    return this.dataSource.dataChange;
  }

  disconnect(): void { }

}
