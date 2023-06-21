import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Products } from 'src/app/utils/products';
import { ProductDataService } from 'src/app/services/data-services/product-data.service';
import { FavoritesService } from 'src/app/services/products-services/favorites.service';
import { DniDataService } from 'src/app/services/data-services/dni-data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() products: Products.Product[] = [];
  @Input() hasFavorite: boolean = false;
  @Input() hasAmount: boolean = false;
  @Input() disabledRedirect: boolean = false;

  constructor(private navigationService: NavigationService, private productData: ProductDataService, private favoritesService: FavoritesService, private DNIService: DniDataService) {
  }

  ngOnInit() {
  }

  substract(e: any) {
    this.products.forEach((product: Products.Product) => {
      if (product.id === Number(e.target.id.replace(/[^0-9]/g, ''))) {
        if (product.amount) {
          product.amount = product.amount - 1;
        }
      }
    });
  }

  add(e: any) {
    this.products.forEach((product: Products.Product) => {
      if (product.id === Number(e.target.id.replace(/[^0-9]/g, ''))) {
        if (product.amount || product.amount === 0) {
          product.amount = product.amount + 1;
        }
      }
    });
  }

  actionateFavorite(e: any) {
    this.products.forEach((product: Products.Product) => {
      if (product.id === Number(e.target.id.replace(/[^0-9]/g, ''))) {
        console.log(product.id)
        console.log(Number(e.target.id.replace(/[^0-9]/g, '')))
        product.favorite = !product.favorite;
        this.DNIService.recibirDNI().subscribe(dni => {
          this.favoritesService.post({"dni": dni, "id_prod": product.id}).subscribe();
        });
      }
    });
  }

  navigate(propiedad: string, id: number) {
    this.productData.enviarDatos(propiedad, id);
    this.products.forEach((product: Products.Product) => {
      if (product.id === id && this.hasAmount) {
        this.productData.enviarDatos("cantidad", product.amount);
      }
    });
    this.navigationService.navigateToProduct(String(id));
  }

}
