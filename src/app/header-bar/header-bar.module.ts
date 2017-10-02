import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { CoreModule } from '../core/core.module';
import { InboxComponent } from './inbox/inbox.component';
import { AuthModule } from '../core/auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedComponentsModule,
    AuthModule
  ],
  declarations: [HeaderBarComponent, InboxComponent],
  exports: [
    HeaderBarComponent
  ],
  providers: []
})
export class HeaderBarModule {
}
