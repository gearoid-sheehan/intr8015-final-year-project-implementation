import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/userLogin';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserLogin = {email: '', password: ''};

  constructor(private alertifyService: AlertifyService, private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.user).subscribe(next => {
      this.alertifyService.success('Login Successful');
      this.router.navigate(['/home']);
    }, error => {
      this.alertifyService.error('Login failed');
    });
  }

}