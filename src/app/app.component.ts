import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { Credentials } from './interfaces/credentials';
import { HttpTrackerService } from './services/http-tracker.service';

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

  credentials: Credentials = { username: 'Quentin', password: 'abcd1234'};

  constructor(private primengConfig: PrimeNGConfig,
              private httpTracker: HttpTrackerService) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
      this.resultGetUsers = this.httpTracker.logIn(this.credentials);
      console.log(this.resultGetUsers);
  }
}
