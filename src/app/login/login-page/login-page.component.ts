import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string;
  validationMessage: { [key: string]: string };

  constructor(private router: Router,
              private loginService: LoginService) {
    this.validationMessage = {
      username: 'Username is required',
      password: 'Password is required'
    };
  }

  ngOnInit() { }

  login() {
    this.loginService.login(this.username, this.password)
        .subscribe(
          () => this.router.navigate(['/']),
          error => this.errorMessage = 'Username or password is invalid'
        );
  }
}
