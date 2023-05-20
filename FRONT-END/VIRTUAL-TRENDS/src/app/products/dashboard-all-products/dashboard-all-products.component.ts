import { Component } from '@angular/core';
import { GetProductsService } from '../../services/products-services/getProducts.service';
import { Products } from '../../utils/products';

@Component({
  selector: 'app-dashboard-all-products',
  templateUrl: './dashboard-all-products.component.html',
  styleUrls: ['./dashboard-all-products.component.css']
})
export class DashboardAllProductsComponent {
  products: any = [];
  hasFavorite: boolean = false;
  hasAmount: boolean = false;
  constructor(private GetProductsService: GetProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts() {
    this.GetProductsService.get('http://localhost:3000/products').subscribe((data: any) => {
      this.products = data;
    });
  }
}
