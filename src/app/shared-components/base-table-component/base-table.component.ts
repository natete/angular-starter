import { OnInit } from '@angular/core';
import { Filter } from './table-filter';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TableDefinition } from '../table/table-definition';
import { PageableTableComponent } from '../pageable-table-component/pageable-table.component';
import { SearchState } from '../table-header/search-state';
import { CONFIG_CONSTANTS } from '../../core/constants/config.constants';

@AutoUnsubscribe()
export abstract class BaseTableComponent extends PageableTableComponent implements OnInit {

  protected filter: Filter = new Filter();
  protected tableDefinition: TableDefinition;

  constructor() {
    super();
  }

  abstract getData();

  ngOnInit(): void {
    super.ngOnInit();
    this.initFilter();
  }

  initFilter() {
    this.filter.sort = this.tableDefinition.baseSort + '-' + this.tableDefinition.baseSortDirection;
    this.filter.page = 0;
    this.filter.size = CONFIG_CONSTANTS.TABLE_NUMBER_OF_RESULTS;
  }

  onRowClicked(id: number) { }

  onSearch(searchState: SearchState) {
    this.filter.criteria = searchState.searchCriteria && searchState.searchCriteria.key;
    this.filter.criteriaType = searchState.searchCriteria && searchState.searchCriteria.criteriaType;
    this.filter.searchTerm = searchState.searchTerm;
    this.getData();
  }
}
