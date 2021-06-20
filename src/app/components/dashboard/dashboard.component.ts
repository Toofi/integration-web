import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';
import { ProductsService } from 'src/app/services/products.service';

import { SortEvent } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any;

  product: Product = {
    url: "https://www.amazon.fr/Console-Game-Watch-Legend-Nintendo/dp/B097F6916C/ref=zg_bs_videogames_home_3?_encoding=UTF8&psc=1&refRID=HTWX9WDADTK3W1HXVK31"
  }

  constructor(public productsService: ProductsService,
    private usersService: UsersService,
    private httpClient: HttpClient,
    private httpTracker: HttpTrackerService) { 

    }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(prod => {
      this.products = Object.values(prod);
      // this.productsService.postProducts(this.product).subscribe((ok) => console.log('ok'), (pasok) => { console.log('pas ok');
      // });
      console.log(this.products.prices);
      
    });

  };

  // this.products = this.productsService.getProducts();
  // console.log(this.products[0].prices[0].price.$numberDecimal);
}
