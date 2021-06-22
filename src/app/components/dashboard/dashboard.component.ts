import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  products: any;
  display: boolean = false;
  loading: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public productsService: ProductsService,
    private router: Router) { }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  getProducts() {
    this.productsService.getProducts()
      .pipe(takeUntil(this._destroy$))
      .subscribe(prod => {
        this.products = Object.values(prod);
        console.log(this.products);
      });
  };

  removeProduct(product: Product, productId: string) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      try {
        this.productsService.removeProduct(productId)
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
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
    this.productsService.postProduct(product)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
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
