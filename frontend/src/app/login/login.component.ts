import {Component, OnInit} from '@angular/core';
import {NetworkService} from "../network/network.service";
import {User} from "../interface/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usernameOrEmail: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(private networkService: NetworkService, private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  login(): void {
    this.networkService.login(this.usernameOrEmail, this.password).subscribe(
      (user: User[]) => {
        if (user) {
          this.loginMessage = 'Login successful!';
          this.router.navigate(['/employees']);
          this.authenticationService.setAuthenticated(true);
        } else {
          this.loginMessage = 'Login failed!';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.loginMessage = 'Invalid Username/Password.';
      }
    );
  }
}
