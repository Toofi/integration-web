import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private token: string | null = sessionStorage.getItem('trackerToken') ? sessionStorage.getItem('trackerToken') : null;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  constructor(public productsService: ProductsService,
    private httpClient: HttpClient,
    private httpTracker: HttpTrackerService) { 

    }
  products: Array<any> = this.productsService.getProducts();

  ngOnInit(): void {
    // this.httpClient
    //   .get<any[]>(`${this.httpTracker.getApiUrl()}/api/my-products`, { headers: this.headers, responseType: 'json', withCredentials: true })
    //   .subscribe(element => {
    //     this.products = element;
    //     // for (let index = 0; index < this.products.length; index++) {
    //     //   const prices = this.products[index].prices;
    //     //   for (let index = 0; index < prices.length; index++) {
    //     //     const element = prices[index].price;
    //     //     console.log(element);
    //       // }
    //     // }
    //   });
    console.log(this.products)
  };

  // this.products = this.productsService.getProducts();
  // console.log(this.products[0].prices[0].price.$numberDecimal);
}
