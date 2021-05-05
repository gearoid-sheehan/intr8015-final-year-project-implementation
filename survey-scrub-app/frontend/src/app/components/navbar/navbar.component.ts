import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navSearchTitle: any;
  constructor(public authService: AuthService, public alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.alertify.message("Logged Out");
  }
}
