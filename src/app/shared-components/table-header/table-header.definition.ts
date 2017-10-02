import { SearchCriteria } from './search-criteria';

export interface TableHeaderDefinition {
  criterias: SearchCriteria[];
  baseCriteria: string;
}
