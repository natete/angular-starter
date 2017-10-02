import { ColumnDefinition } from './columns/column-definition';
import { SortDirection } from '@angular/material';

export class TableDefinition {
  columns: ColumnDefinition[];
  baseSort?: string;
  baseSortDirection?: SortDirection;
  styleClasses?: string;

  get displayedColumns(): string[] { return this.columns.map(column => column.fieldName); }

  constructor(columns: ColumnDefinition[], baseSort?: string, baseSortDirection?: SortDirection, styleClasses?: string) {
    this.columns = columns;
    this.baseSort = baseSort;
    this.baseSortDirection = baseSortDirection;
    this.styleClasses = styleClasses;
  }
}
