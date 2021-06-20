import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



import jwt_decode from 'jwt-decode';

import { User } from '../interfaces/user';
import { Credentials } from '../interfaces/credentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpTrackerService {

  private apiUrl: string = environment.apiUrl;
  private isAuth: boolean = false;

  constructor(private httpClient: HttpClient) { }

  getIsAuth(): boolean {
    return this.isAuth;
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getToken(): string | null {
    return sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;
  }

  logIn(credentials: Credentials) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let httpParams = new HttpParams()
    .set('username', credentials.username).set('password', credentials.password);
    
    return this.httpClient
      .post(`${this.apiUrl}/login`, httpParams.toString(), { headers: headers, withCredentials: true })
      .subscribe(async (result) => {
        console.log("token : "+ result);
        sessionStorage.setItem('trackerToken', result.toString());
        if(sessionStorage.getItem('trackerToken')) {
          let decoded: User = await jwt_decode(result.toString());          
          decoded._id ? sessionStorage.setItem('trackerId', decoded._id.toString()) : null;      
          this.isAuth = true;
        }
      }, (error) => {
        console.log('Oups', error);
      });
  };

  logOut() {
    sessionStorage.removeItem('trackerToken');
    sessionStorage.removeItem('trackerId')
    this.isAuth = false;
    
  }
}

