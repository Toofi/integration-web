import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
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

  productForm: FormGroup | any;



  data: any;
    
  options: any;


  constructor(public productsService: ProductsService,
    private formBuilder: FormBuilder) {
      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    }
    
    this.options = {
      labels: {
        display: false,
      },
        title: {
            display: false,
            fontSize: 16
        },
        legend: {
          display:false,
            position: 'bottom'
        }
    };
     }

  ngOnInit(): void {
    this.getProducts();
    this.initForm();
  };

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
        this.populatePrices(this.products);
      });
  };

  populatePrices(products: any) {
    let priceObj = {
      date: [],
      price: [],
    }
    let arrayObj: Array<any> = [];
    for (let index = 0; index < products.length; index++) {
      arrayObj = products.map((element: { prices: any; }) => element.prices);
    }
    for (let index = 0; index < arrayObj.length; index++) {
      priceObj.date = arrayObj.map((element: { prices: any; }) => element.prices)
    }
    console.log(arrayObj);
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

  addProduct() {
    this.loading = true;
    const formValue = this.productForm.value;
    const product: Product = {
      url: formValue['url']
    };
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

  initForm() {
    this.productForm = this.formBuilder.group({ url: '' });
  };



}
