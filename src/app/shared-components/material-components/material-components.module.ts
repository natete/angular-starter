import { NgModule } from '@angular/core';
import {
  DateAdapter,
  MdAutocompleteModule,
  MdButtonModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdRadioModule,
  MdSelectModule,
  MdSliderModule
} from '@angular/material';
import { SimpleDateAdapter } from './simple-date-adapter';
import { DragDropModule, TreeModule } from 'primeng/primeng';

@NgModule({
  imports: [
    DragDropModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    // MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    TreeModule
  ],
  exports: [
    DragDropModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    // MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    TreeModule
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
