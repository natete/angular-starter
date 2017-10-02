import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableDefinition } from './table-definition';
import { MdPaginator, MdSort, PageEvent, Sort } from '@angular/material';
import { TableData } from './table-data';
import { TableDataSource } from './table-data-source';
import { ActionEvent } from '../actions/action-event';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableDefinition: TableDefinition;
  @Input() data: TableData;
  @Input() dataName: string;
  @Output() onSortChange = new EventEmitter<string>();
  @Output() onPageChange = new EventEmitter<PageEvent>();
  @Output() onRowClicked = new EventEmitter<number>();
  @Output() onActionClicked = new EventEmitter<ActionEvent>();
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  dataSource: TableDataSource;

  constructor() { }

  ngOnInit() {
    this.dataSource = new TableDataSource(this.data);
    this.sort.sortChange.subscribe(sort => this.onSortByColumn(sort));
    this.paginator.page.subscribe(page => this.onPageChange.emit(page));
  }

  onSortByColumn(sort: Sort) {
    let sortDef = '';
    if (sort.direction) {
      sortDef = sort.active + '-' + sort.direction;
    }

    this.onSortChange.emit(sortDef);
  }

  onRowSelected(id: number) {
    this.onRowClicked.emit(id);
  }

  executeAction(e: Event, entity: any, action: string) {
    e.stopPropagation();
    e.preventDefault();
    this.onActionClicked.emit({ entity, action });
  }
}
