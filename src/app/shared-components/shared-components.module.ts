import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { BaseFormModule } from './base-form-component/base-form.module';
import { ToastModule } from './toast/toast.module';

@NgModule({
  imports: [
    CommonModule,

    BaseFormModule,

    MaterialComponentsModule,
    ToastModule
  ],
  exports: [
    BaseFormModule,
    MaterialComponentsModule,
    ToastModule
  ],
  declarations: []
})
export class SharedComponentsModule {}
