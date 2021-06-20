import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';
import { ProductsService } from 'src/app/services/products.service';

import { SortEvent } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';
import { Product } from 'src/app/interfaces/product';
import { NgForm } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any;

  constructor(public productsService: ProductsService,
    private usersService: UsersService,
    private httpClient: HttpClient,
    private httpTracker: HttpTrackerService) {

  }
  
  getProducts() {
    this.productsService.getProducts().subscribe(prod => {
      this.products = Object.values(prod);
      console.log(this.products);
    });
  };

  removeProduct(product: Product, productId: string) {
    const index = this.products.indexOf(product);
    console.log(productId);

    this.productsService.removeProduct(productId).subscribe(() => console.log("Suppression réussie"));
    this.products.splice(index, 1);
  }

  addProduct(f: NgForm) {
    const product: Product = {
      url: f.value['url']
    }
    this.productsService.postProduct(product).subscribe(() => console.log("Ajout réussi"));
  }

  ngOnInit(): void {
    this.getProducts();

  };

  // this.products = this.productsService.getProducts();
  // console.log(this.products[0].prices[0].price.$numberDecimal);
}
