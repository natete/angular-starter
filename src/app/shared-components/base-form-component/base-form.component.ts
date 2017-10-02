import { MdDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-component',
  template: '<ng-container></ng-container>'
})
export class BaseFormComponent {

  unsavedChanges: boolean;

  constructor(protected dialog: MdDialog) { }

  unsavedChangesConfirmationDialog(): Observable<boolean> {

    return this.dialog.open(ConfirmDialogComponent).afterClosed().map(result => !!result);
  }
}
