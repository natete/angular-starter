import { CriteriaType } from '../table-header/criteria-type';
import * as moment from 'moment';
import { PageableFilter } from '../pageable-table-component/pageable-filter';

export class Filter extends PageableFilter {
  private term: string;
  criteria?: string;
  criteriaType?: CriteriaType;

  set searchTerm(searchTerm: string) { this.term = searchTerm; }

  get searchTerm(): string {
    if (this.criteriaType === CriteriaType.STRING) {
      return this.term || '';
    } else if (this.criteriaType === CriteriaType.DATE) {
      const date = moment(this.term, moment.localeData().longDateFormat('L'));
      if (date.isValid()) {
        return moment(this.term, moment.localeData().longDateFormat('L')).toISOString();
      } else {
        return '';
      }
    }
  }
}
