import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHeaderDefinition } from './table-header.definition';
import { SearchState } from './search-state';
import { SearchCriteria } from './search-criteria';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {

  @Input() headerDefinition: TableHeaderDefinition;
  @Input() numOfResults: number;
  @Input() dataName: string;

  @Output() onSearch = new EventEmitter<SearchState>();
  @Output() onToggleFilter = new EventEmitter<boolean>();

  private searchState: SearchState;
  private showFilter = false;

  buttonText = 'Show filter';

  constructor() { }

  ngOnInit() {
    this.searchState = {
      searchCriteria: this.getSearchCriteria(),
      searchTerm: ''
    };

    this.onSearch.emit(this.searchState);
  }

  onCriteriaSelected(criteriaKey: string) {
    this.searchState.searchCriteria = this.getSearchCriteria(criteriaKey);
    this.onSearch.emit(this.searchState);
  }

  search(searchTerm: string) {
    this.searchState.searchTerm = searchTerm;
    this.onSearch.emit(this.searchState);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    this.buttonText = this.showFilter ? 'Hide filter' : 'Show filter';
    this.onToggleFilter.emit(this.showFilter);
  }

  private getSearchCriteria(criteriaKey?: string): SearchCriteria | null {
    if (this.headerDefinition) {
      return this.headerDefinition.criterias.find(c => c.key === (criteriaKey || this.headerDefinition.baseCriteria));
    } else {
      return null;
    }
  }
}
