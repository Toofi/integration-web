import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any;
  display: boolean = false;
  loading: boolean = false;

  constructor(public productsService: ProductsService,
    private router: Router) { }

  getProducts() {
    this.productsService.getProducts().subscribe(prod => {
      this.products = Object.values(prod);
    });
  };

  removeProduct(product: Product, productId: string) {
    const index = this.products.indexOf(product);
    if(index !== -1) {
      try {
        this.productsService.removeProduct(productId).subscribe(() => {
          this.products.splice(index, 1);   
          this.getProducts();
          console.log("Suppression réussie");
          this.ngOnInit();
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  addProduct(f: NgForm) {
    this.loading = true;
    const product: Product = {
      url: f.value['url']
    }
    this.productsService.postProduct(product).subscribe(() => { 
      this.loading = false;
      this.closeDialog();
      console.log("Ajout réussi");
      this.ngOnInit();
    });
  };

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  ngOnInit(): void {
    this.getProducts();
  };

  // this.products = this.productsService.getProducts();
  // console.log(this.products[0].prices[0].price.$numberDecimal);
}
