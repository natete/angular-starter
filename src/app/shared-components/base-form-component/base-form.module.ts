import { NgModule } from '@angular/core';
import { BaseFormComponent } from './base-form.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MdButtonModule, MdDialogModule, MdNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  imports: [
    MdButtonModule,
    MdDialogModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  exports: [
    BaseFormComponent,
    MdNativeDateModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  declarations: [
    ConfirmDialogComponent,
    BaseFormComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class BaseFormModule { }
