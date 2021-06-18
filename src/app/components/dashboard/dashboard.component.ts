import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private productsService: ProductsService) { }
  products: Array<any> = ['coucou'];

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    console.log(this.products);
  }

}
