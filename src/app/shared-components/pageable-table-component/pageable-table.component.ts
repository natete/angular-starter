import { OnInit } from '@angular/core';
import { PageableFilter } from './pageable-filter';
import { CONFIG_CONSTANTS } from '../../core/constants/config.constants';
import { TableDefinition } from '../table/table-definition';
import { PageEvent } from '@angular/material';

export abstract class PageableTableComponent implements OnInit {
  protected filter: PageableFilter;
  protected tableDefinition: TableDefinition;

  ngOnInit(): void {
    this.initFilter();
  }

  initFilter() {
    this.filter.sort = this.tableDefinition.baseSort + '-' + this.tableDefinition.baseSortDirection;
    this.filter.page = 0;
    this.filter.size = CONFIG_CONSTANTS.TABLE_NUMBER_OF_RESULTS;
  }

  getInitialPage(): PageEvent {
    return {
      pageIndex: 0,
      pageSize: CONFIG_CONSTANTS.TABLE_NUMBER_OF_RESULTS,
      length: 0
    };
  }

  onSortChange(sort: string) {
    this.filter.sort = sort;
    this.getData();
  }

  onPageChange(page: PageEvent) {
    this.filter.page = page.pageIndex;
    this.filter.size = page.pageSize;
    this.getData();
  }

  abstract getData();
}
