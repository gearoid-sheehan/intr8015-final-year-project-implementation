import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider, transformer, fader, stepper } from './route-animations';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { AlertifyService } from './services/alertify.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ // <-- add your animations here
    fader,
    //slider,
    //transformer,
    //stepper
  ]
})

export class AppComponent implements OnInit {

  title = 'frontend';
  users: any;

  constructor(private httpClient: HttpClient, public authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    //this.getUsers();
    this.setCurrentUser();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
  }

  // getUsers() {
  //   this.httpClient.get(environment + '/users').subscribe(response => {
  //     this.users = response;
  //   }, error => {
  //     console.log(error);
  //     this.alertify.error(error);
  //   })
  // }
}