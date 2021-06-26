import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Prices } from 'src/app/interfaces/prices';
import { Chart, Dataset } from 'src/app/interfaces/chart';

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

  pricesArray: Array<Prices> = [];
  chartsArray: Array<Chart> = [];
  chart: Chart = { labels: [], datasets: [] };
  dataset: Dataset = { label: '', data: [] };
  options: any;

  iterDate(array: Array<any>): Array<any> {

    return [];
  };

  constructor(public productsService: ProductsService,
    private formBuilder: FormBuilder) {

    this.options = {
      scales: {
        xAxes: [{
          ticks: {
            display: false
          }
        }]
      },
      labels: {
        display: false,
      },
      title: {
        display: false,
        fontSize: 16
      },
      legend: {
        display: false,
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

        this.pricesArray = this.products.map((element: any) => this.populatePrices(element));
        console.log(this.pricesArray);
        this.chartsArray = this.pricesArray.map(element => this.populateChart(element.prices, element.dates));
        console.log(this.chartsArray);
      });
  };

  populateChart(prices: Array<number>, dates: Array<string>): Chart {
    return this.chart = {
      labels: dates.slice(-10),
      datasets: [
        {
          label: 'Prix',
          data: prices.slice(-10)
        },
      ]
    };
  };

  populatePrices(products: any): Prices {
    let prices: Array<any> = [];
    let pricesObj: Prices = {
      dates: [],
      prices: []
    };
    prices = products.prices;
    pricesObj.dates = prices.map((element: { date: any; }) => element.date);
    pricesObj.prices = prices.map((element: { price: { $numberDecimal: any; }; }) => parseFloat(element.price.$numberDecimal));
    return pricesObj;
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
