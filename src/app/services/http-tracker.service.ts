import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../interfaces/user';
import { Credentials } from '../interfaces/credentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpTrackerService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  logIn(credentials: Credentials) {
    console.log(credentials);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    return this.httpClient
      .post(`${this.apiUrl}/login`, { username: credentials.username, password: credentials.password }, { headers: headers })
      .subscribe((result) => {
        console.log(result);
      }, (error) => {
        console.log('Oups', error);
      });
  };

  signIn(user: User) {
    this.httpClient
      .post(`${this.apiUrl}/users`, user)
      .subscribe(() => {
        console.log('Logs sent');
      }, (error) => {
        console.log(error);
      });
  };

  getUsers() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3MGU2MThmZmZhYjE2ZWQ2MTcxMjQiLCJ1c2VybmFtZSI6IlF1ZW50aW4iLCJmaXJzdE5hbWUiOiJRdWVudGluIiwibGFzdE5hbWUiOiJIZXJwb2VsIiwiZW1haWxzIjpbImhlcnBvZWwucXVlbnRpbkBnbWFpbC5jb20iLCI5MHRvb2ZpQGdtYWlsLmNvbSJdLCJpYXQiOjE2MjM2NTgwODN9.ZkP4Z86XDK6jKNCbWpQM6gRBFjKh1HpkOdHPfJxukPk'
    });
    return this.httpClient
      .get(`${this.apiUrl}/api/users`, { headers: headers, responseType: 'json' })
      .subscribe((values) => console.log(values));
  };
}

