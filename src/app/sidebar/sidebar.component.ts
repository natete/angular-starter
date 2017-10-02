import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_CONSTANTS } from '../core/constants/routes.constants';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  ROUTES = ROUTES_CONSTANTS;

  constructor(public router: Router,
              private authService: AuthService) { }

  ngOnInit() { }

  logout() {
    this.authService.logOut().subscribe(() => this.router.navigate(['/login']));
  }
}
