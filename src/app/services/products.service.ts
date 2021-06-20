import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpTrackerService } from './http-tracker.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  // private signHeader = new HttpHeaders({
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // });

  // private postHeader = new HttpHeaders({
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Authorization': `Bearer ${this.token}`
  // });

  constructor(private httpClient: HttpClient,
    private httpTracker: HttpTrackerService) { }

  getProducts(): Observable<object> {
    // let token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });
    return this.httpClient
      .get<object>(`${this.httpTracker.getApiUrl()}/api/my-products`);
  }

  postProduct(product: Product): Observable<object> {
    // let token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;
    // const postHeader = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Authorization': `Bearer ${token}`
    // });
    const body: HttpParams = new HttpParams()
      .set('url', product.url);

    return this.httpClient
      .post(`${this.httpTracker.getApiUrl()}/api/products`, body.toString());
  };

  removeProduct(productId: string) {
    let token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;
    console.log(productId);
    const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient
      .delete(`${this.httpTracker.getApiUrl()}/api/products/${productId}`, { headers: header, withCredentials: true});
  };

}
