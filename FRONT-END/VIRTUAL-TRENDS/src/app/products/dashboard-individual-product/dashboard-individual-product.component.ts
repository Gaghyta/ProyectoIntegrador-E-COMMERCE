import { Component } from '@angular/core';
import { GetProductsService } from '../../services/products-services/getProducts.service';
import { Products } from '../../utils/products';

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

  constructor(private GetProductsService: GetProductsService) { }

  public loadProduct() {
    this.GetProductsService.get('http://localhost:3000/products').subscribe((data: any) => {
      this.title = data[0].name;
      this.description = data[0].description;
      this.colors = data[0].colors;
      this.pictures = data[0].pictures;
    });
  }

  ngOnInit(): void {
    this.loadProduct();
  }
}
