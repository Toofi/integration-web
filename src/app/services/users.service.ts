import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../interfaces/user';

import { HttpTrackerService } from './http-tracker.service';
import { Product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  private signHeader = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  private postHeader = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${this.token}`
  });

  constructor(private httpClient: HttpClient,
    private httpTracker: HttpTrackerService) { }
//OK
  signIn(user: User) {
    const body: HttpParams = new HttpParams()
    .set('username', user.username)
    .set('firstName', user.firstName)
    .set('lastName', user.lastName)
    .set('password', user.password)
    .set('emails[0]', user.emails[0]);
    
    return this.httpClient
      .post(`${this.httpTracker.getApiUrl()}/users`, body.toString(), { headers: this.signHeader, withCredentials: true })
      .subscribe((value) => {
        console.log('Logs sent' + value);
      }, (error) => {
        console.log(error);
      });
  };
//OK
  getUsers() {
    if (!this.token) {
      return `Erreur, il n'y a pas de token !`;
    }
    return this.httpClient
      .get(`${this.httpTracker.getApiUrl()}/api/users`, { headers: this.headers, responseType: 'json' })
      .subscribe((values) => console.log(values));
  };
//OK
  getUser(profileId: string | null) {
    if (this.token === null || sessionStorage.getItem('trackerId') === null) {
      return `Erreur, pas de token!`;
    }
    return this.httpClient
      .get(`${this.httpTracker.getApiUrl()}/api/profile/${profileId}`, { headers: this.headers, responseType: 'json' })
      .subscribe((values) => console.log(values));
  }

  putUser(user: User) {
    console.log(user);
    console.log(this.token + 'token');
    const body: HttpParams = new HttpParams()
    .set('username', user.username)
    .set('firstName', user.firstName)
    .set('lastName', user.lastName)
    .set('password', user.password)
    .set('emails[0]', user.emails[0]);

    return this.httpClient
      .put<User>(`${this.httpTracker.getApiUrl()}/api/users`, body.toString(), { headers: this.postHeader, responseType: 'json', withCredentials: true })
      .subscribe((values) => {
        console.log(values)
      }, (e) => {
        console.log('erreur', e)
      });
  }

  putTrackedProduct(product: Product, productId: string) {
    console.log('TOKEN' + this.token + 'TOKEN');

    return this.httpClient
      .put<Product>(`${this.httpTracker.getApiUrl()}/api/users/${productId}`, product, { headers: this.headers, responseType: 'json', withCredentials: true })
      .subscribe((values) => {
        console.log(values)
      }, (e) => {
        console.log('erreur', e)
      });
  }
}
//signIn ok
//get user
// get users ok
// post user ok vers signIn
// put user
// put trackedproduct
// delete user?
