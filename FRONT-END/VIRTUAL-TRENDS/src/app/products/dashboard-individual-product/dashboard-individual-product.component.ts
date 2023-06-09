import { Component } from '@angular/core';
import { GetProductsService } from '../../services/products-services/getProducts.service';
import { Products } from '../../utils/products';
import { ProductsFactoryService } from 'src/app/services/products-services/productsFactory.service';
import { ProductDataService } from 'src/app/services/data-services/product-data.service';

@Component({
  selector: 'app-dashboard-individual-product',
  templateUrl: './dashboard-individual-product.component.html',
  styleUrls: ['./dashboard-individual-product.component.css']
})
export class DashboardIndividualProductComponent {
  title: string = '';
  description: string = '';
  colors: Products.Colors[] = [];
  pictures: Products.Pictures[] = [];
  isLoading: boolean = false;
  id: number = 0;

  constructor(private GetProductsService: GetProductsService, private ProductsFactoryService: ProductsFactoryService, private productData: ProductDataService) { }
  
  public loadProduct() {
    this.ProductsFactoryService.getProducts().subscribe((data: Products.Product[]) => {
      data.map((product: Products.Product) => {
        if (product.id === this.id) {
          this.title = product.name;
          this.description = product.description;
          this.colors = product.colors;
          this.pictures = product.pictures;
        }
      });
      this.ProductsFactoryService.saveProduct({
        name: this.title,
        description: this.description,
        colors: this.colors,
        pictures: this.pictures
      });
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.productData.recibirDatos("id_producto").subscribe(dato => {
      this.id = dato;
    });
    this.loadProduct();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
