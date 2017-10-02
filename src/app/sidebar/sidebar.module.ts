import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { CoreModule } from '../core/core.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HttpModule,
    SharedComponentsModule
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class SidebarModule {
}
