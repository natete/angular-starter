import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { MdInputModule } from '@angular/material';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    SharedComponentsModule
  ],
  declarations: [
    LoginPageComponent
  ],
  providers: [LoginService]
})
export class LoginModule {
}
