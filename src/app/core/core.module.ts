import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './routing/app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './routing/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmLeaveGuard } from './routing/confirm-leave.guard';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [],
  providers: [
    AuthGuard,
    ConfirmLeaveGuard
  ]
})
export class CoreModule {
}
