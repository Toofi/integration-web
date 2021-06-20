import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpTrackerService } from './http-tracker.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient,
    private httpTracker: HttpTrackerService) { }

  getProducts(): Observable<object> {
    return this.httpClient
      .get<object>(`${this.httpTracker.getApiUrl()}/api/my-products`);
  }

  postProduct(product: Product): Observable<object> {
    const body: HttpParams = new HttpParams()
      .set('url', product.url);

    return this.httpClient
      .post(`${this.httpTracker.getApiUrl()}/api/products`, body.toString());
  };

  removeProduct(productId: string): Observable<object> {
    return this.httpClient
      .delete(`${this.httpTracker.getApiUrl()}/api/products/${productId}`);
  };

}
