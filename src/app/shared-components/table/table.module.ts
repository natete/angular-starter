import { NgModule } from '@angular/core';
import {
  MdIconModule, MdPaginatorModule, MdSelectModule, MdSortModule, MdTableModule,
  MdButtonModule
} from '@angular/material';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    FormsModule,
    MdButtonModule,
    MdIconModule,
    MdPaginatorModule,
    MdSelectModule,
    MdSortModule,
    MdTableModule
  ],
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule {
}
