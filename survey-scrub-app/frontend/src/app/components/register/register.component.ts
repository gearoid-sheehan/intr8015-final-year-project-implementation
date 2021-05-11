import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/userLogin';
import { UserRegister } from 'src/app/models/userRegister'
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  passwordCheck: string;
  userLogin: UserLogin = {email: '', password: ''};

  user: UserRegister = {firstName: '', lastName: '', email: '', company: '', sector: '', password: ''};
  sectors: any [] = ['Information Technology', 'Health Care', 'Financials',
                        'Consumer Discretionary', 'Communication Services',
                        'Industrials', 'Consumer Staples', 'Energy',
                        'Utilities', 'Real Estate', 'Materials'];

  constructor(private authService: AuthService, private alertifyService: AlertifyService, private router: Router) { }

  register() {

    if (this.passwordCheck == this.user.password) {
      this.authService.register(this.user).subscribe(next => {

        this.userLogin.email = this.user.email;
        this.userLogin.password = this.user.password;

        this.alertifyService.success('Registration Successful');

        this.login();

      }, error => {
        this.alertifyService.error('Registration failed. Please try again.');
      });
    }
    else {
      this.alertifyService.error("Passwords do not match");
    }
  }

login() {

    this.authService.login(this.userLogin).subscribe(next => {
      this.alertifyService.success('Login Successful');
      this.router.navigate(['/home']);
    }, error => {
      this.alertifyService.error('Login failed');
    });
  }
}
