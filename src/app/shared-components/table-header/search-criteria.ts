import { CriteriaType } from './criteria-type';

export interface SearchCriteria {
  key: string;
  displayOption: string;
  criteriaType: CriteriaType;
}
