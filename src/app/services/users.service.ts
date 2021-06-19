import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../interfaces/user';

import { HttpTrackerService } from './http-tracker.service';
import { Product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${this.token}`
  // });



  // private postHeader = new HttpHeaders({
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Authorization': `Bearer ${this.token}`
  // });

  constructor(private httpClient: HttpClient,
    private httpTracker: HttpTrackerService) { }

  signIn(user: User) {
    const signHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body: HttpParams = new HttpParams()
      .set('username', user.username)
      .set('firstName', user.firstName)
      .set('lastName', user.lastName)
      .set('password', user.password)
      .set('emails[0]', user.emails[0]);

    return this.httpClient
      .post(`${this.httpTracker.getApiUrl()}/users`, body.toString(), { headers: signHeader, withCredentials: true });
  };

  getUsers() {
    const token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient
      .get(`${this.httpTracker.getApiUrl()}/api/users`, { headers: headers, responseType: 'json' })
      .subscribe((values) => console.log(values));
  };

  getUser(profileId: string | null) {
    const token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient
      .get(`${this.httpTracker.getApiUrl()}/api/profile/${profileId}`, { headers: headers, responseType: 'json' })
      .subscribe((values) => console.log(values));
  }

  putUser(user: User) {
    const token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;
    const postHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    });
    const body: HttpParams = new HttpParams()
      .set('username', user.username)
      .set('firstName', user.firstName)
      .set('lastName', user.lastName)
      .set('password', user.password)
      .set('emails[0]', user.emails[0]);

    return this.httpClient
      .put<User>(`${this.httpTracker.getApiUrl()}/api/users`, body.toString(), { headers: postHeader, responseType: 'json', withCredentials: true })
      .subscribe((values) => {
        console.log(values)
      }, (e) => {
        console.log('erreur', e)
      });
  }

  putTrackedProduct(product: Product, productId: string) {
    const token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient
      .put<Product>(`${this.httpTracker.getApiUrl()}/api/users/${productId}`, product, { headers: headers, responseType: 'json', withCredentials: true })
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
