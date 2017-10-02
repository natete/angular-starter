import { NgModule } from '@angular/core';
import {
  DateAdapter,
  MdButtonModule,
  MdDialogModule,
  MdExpansionModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule
} from '@angular/material';
import { SimpleDateAdapter } from './simple-date-adapter';
import { DragDropModule } from 'primeng/primeng';

@NgModule({
  imports: [
    DragDropModule,
    MdButtonModule,
    MdDialogModule,
    MdExpansionModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule
  ],
  exports: [
    DragDropModule,
    MdButtonModule,
    MdDialogModule,
    MdExpansionModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule
  ],
  providers: [
    { provide: DateAdapter, useClass: SimpleDateAdapter }
  ]
})
export class MaterialComponentsModule {

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale(window.navigator.language);
  }
}
