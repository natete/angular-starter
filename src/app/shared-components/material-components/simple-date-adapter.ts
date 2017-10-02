import { NativeDateAdapter } from '@angular/material';
import * as moment from 'moment';

export class SimpleDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    return moment(date).format(moment.localeData().longDateFormat('L'));
  }

  getFirstDayOfWeek(): number {
    return moment.localeData().firstDayOfWeek();
  }
}
