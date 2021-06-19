import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpTrackerService } from './http-tracker.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

    getProducts() {
      let result: Array<any>= [];
      this.httpClient
      .get<any[]>(`${this.httpTracker.getApiUrl()}/api/my-products`, { headers: this.headers, responseType: 'json', withCredentials: true })
      .subscribe(response => {
        result = response;
        console.log('resultat',result);
        
        // for (let index = 0; index < this.products.length; index++) {
        //   const prices = this.products[index].prices;
        //   for (let index = 0; index < prices.length; index++) {
        //     const element = prices[index].price;
        //     console.log(element);
          // }
        // }
      });
      console.log(result);
      
      return result;
    }
}
