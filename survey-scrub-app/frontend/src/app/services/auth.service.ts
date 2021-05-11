import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/userLogin';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { Observable, ReplaySubject } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  result: any;
  baseUrl = environment.apiEndpoint + '/auth';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  register(user: FormData) {
    console.log(user)
    return this.http.post(this.baseUrl + '/register', user);
  }

  login(user: UserLogin) {
    return this.http.post(this.baseUrl + '/login', user).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user)
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  /* Checks for token in local storage, returns true
    if token exists, false if it does not*/

  loggedIn() {
    const token = localStorage.getItem('user');
    return !! token;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
