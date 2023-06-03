import { Component } from '@angular/core';
import { GetProductsService } from '../../services/products-services/getProducts.service';
import { Products } from '../../utils/products';
import { ProductDataService } from 'src/app/services/data-services/product-data.service';

@Component({
  selector: 'app-dashboard-all-products',
  templateUrl: './dashboard-all-products.component.html',
  styleUrls: ['./dashboard-all-products.component.css']
})
export class DashboardAllProductsComponent {
  products: Products.Product[] = [];
  hasFavorite: boolean = false;
  hasAmount: boolean = false;
  isLoading: boolean = false;
  constructor(private GetProductsService: GetProductsService, private productData: ProductDataService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadProducts();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.productData.enviarDatos("id_producto", null)
    this.productData.enviarDatos("cantidad", null)

  }

  public loadProducts() {
    this.GetProductsService.get().subscribe((data: any) => {
      this.products = data;
    });
  }
}
