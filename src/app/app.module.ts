import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { NotFoundModule } from './not-found/not-found.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContentTypeInterceptor } from './core/http/content-type.interceptor';
import { TokenInterceptor } from './core/http/token.interceptor';
import { AuthErrorInterceptor } from './core/http/auth-error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CoreModule,

    // App modules
    HomeModule,
    LayoutModule,
    LoginModule,
    NotFoundModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
