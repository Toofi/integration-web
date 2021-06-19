import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';
import { ProductsService } from 'src/app/services/products.service';

import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any;

  constructor(public productsService: ProductsService,
    private httpClient: HttpClient,
    private httpTracker: HttpTrackerService) { 

    }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(prod => {
      this.products = Object.values(prod);
      console.log(this.products);
      
      console.log(this.products.prices);
      
    });

  };

  // this.products = this.productsService.getProducts();
  // console.log(this.products[0].prices[0].price.$numberDecimal);
}
