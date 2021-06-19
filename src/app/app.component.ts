import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { Credentials } from './interfaces/credentials';
import { Product } from './interfaces/product';
import { User } from './interfaces/user';
import { HttpTrackerService } from './services/http-tracker.service';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'integration-web';

  result: any;
  resultGetUsers: any;

  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MGU2MThmZmZhYjE2ZWQ2MTcxMjQiLCJ1c2VybmFtZSI6IlF1ZW50aW4iLCJmaXJzdE5hbWUiOiJRdWVudGluIiwibGFzdE5hbWUiOiJIZXJwb2VsIiwiZW1haWxzIjpbImhlcnBvZWwucXVlbnRpbkBnbWFpbC5jb20iLCI5MHRvb2ZpQGdtYWlsLmNvbSJdLCJpYXQiOjE2MjM2NTgwODN9.ZkP4Z86XDK6jKNCbWpQM6gRBFjKh1HpkOdHPfJxukPk';
  user: User = {
    username: 'JohantestudPOSTUSER',
    firstName: 'Joshua',
    lastName: 'Charles',
    emails: [
      'test1@gmail.com',
      'test2@gmail.com',
    ],
    password: 'abcd1245'
  };

  credentials: Credentials = { username: 'Quentin', password: 'abcd1234'};

  product: Product = { name: 'test2', };

  constructor(private primengConfig: PrimeNGConfig,
              private httpTracker: HttpTrackerService,
              private usersService: UsersService,) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
      this.httpTracker.logIn(this.credentials);
      // console.log('TRACKERID'+sessionStorage.getItem('trackerId'));
      // this.resultGetUsers = this.usersService.getUsers();
      // this.resultGetUsers = this.usersService.getUser(sessionStorage.getItem('trackerId'));
      // this.resultGetUsers = this.usersService.signIn(this.user);

  }
}
