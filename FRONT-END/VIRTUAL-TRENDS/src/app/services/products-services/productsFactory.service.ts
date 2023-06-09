import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Products } from 'src/app/utils/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsFactoryService {
  private productsList = new BehaviorSubject<Products.Product[]>([]);
  private product = new BehaviorSubject<Products.ProductData>({
    name: '',
    description: '',
    pictures: [],
    colors: []
  });

  constructor() { }

  saveProductsList(products: Products.Product[]) {
    this.productsList.next(products);
  }

  getProducts() {
    return this.productsList;
  }

  saveProduct(product: Products.ProductData) {
    this.product.next(product);
  }
}
