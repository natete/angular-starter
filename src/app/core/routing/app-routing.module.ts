import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../auth/auth.service';
import { ROUTES_CONSTANTS } from '../constants/routes.constants';
import { ConfirmLeaveGuard } from './confirm-leave.guard';
import { LayoutComponent } from '../../layout/layout.component';
import { LoginPageComponent } from '../../login/login-page/login-page.component';
import { NotFoundPageComponent } from '../../not-found/not-found-page/not-found-page.component';
import { HomePageComponent } from '../../home/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTES_CONSTANTS.HOME
      },
      {
        path: ROUTES_CONSTANTS.HOME,
        component: HomePageComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  { path: ROUTES_CONSTANTS.LOGIN, component: LoginPageComponent, canActivate: [AuthGuard] },
  {
    path: '**',
    component: NotFoundPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthService]
})
export class AppRoutingModule { }
