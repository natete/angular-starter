import { SearchCriteria } from './search-criteria';

export interface SearchState {
  searchCriteria: SearchCriteria;
  searchTerm: string;
}
