import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ToastComponent } from './toast.component';

@NgModule({
  imports: [
    CommonModule,
    GrowlModule
  ],
  exports: [
    ToastComponent
  ],
  declarations: [ToastComponent],
  providers: [ToastService]
})
export class ToastModule { }
