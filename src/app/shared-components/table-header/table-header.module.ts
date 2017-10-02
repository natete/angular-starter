import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from './table-header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdIconModule
  ],
  exports: [TableHeaderComponent, SearchBarComponent],
  declarations: [SearchBarComponent, TableHeaderComponent]
})
export class TableHeaderModule {
}
