import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Products } from 'src/app/utils/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() products: Products.Product[] = [];
  @Input() hasFavorite: boolean = false;
  @Input() hasAmount: boolean = false;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  substract(e: any) {
    this.products.forEach((element: Products.Product) => {
      if (element.id === Number(e.target.id.replace(/[^0-9]/g, ''))) {
        if (element.amount) {
          element.amount = element.amount - 1;
        }
      }
    });
  }

  add(e: any) {
    this.products.forEach((element: Products.Product) => {
      if (element.id === Number(e.target.id.replace(/[^0-9]/g, ''))) {
        if (element.amount || element.amount === 0) {
          element.amount = element.amount + 1;
        }
      }
    });
  }

  actionateFavorite(e: any) {
    this.products.forEach((element: Products.Product) => {
      if (element.id === Number(e.target.id.replace(/[^0-9]/g, ''))) {
        element.favorite = !element.favorite;
      }
    });
  }

  navigate() {
    this.navigationService.navigateToProduct();
  }

}
