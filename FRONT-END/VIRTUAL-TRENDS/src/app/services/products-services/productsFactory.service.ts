import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
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
  private productsCarrito: number[] = [];

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

  saveProductCarrito(products: Products.CarritoProduct[]) {
    let newProducts: number[] = [];
    products.map(product => {
      if (product.id_prod) {
        newProducts.push(product.id_prod);
      }
    });
    this.productsCarrito = newProducts;
  }

  getProductCarrito() {
    return this.productsCarrito;
  }

}
