import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { HeaderBarModule } from '../header-bar/header-bar.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HeaderBarModule,
    SidebarModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule {
}
