import { Component, Input } from '@angular/core';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { Products } from '../../../utils/products';
@Component({
  selector: 'app-cards-products',
  templateUrl: './cards-products.component.html',
  styleUrls: ['./cards-products.component.css']
})

export class CardsProductsComponent {
  selectedColor: string = '';
  @Input() colors: Products.Colors[] = [];

  constructor(private navigationService: NavigationService) {
  }

  selectColor(event: any) {
    Array.from(document.getElementsByClassName('color-box')).forEach(element => {
      if (element.id === event.target.id) {
        this.selectedColor = element.id;
        document.getElementById(element.id)?.classList.add('box-shadow');
      }
      else {
        document.getElementById(element.id)?.classList.remove('box-shadow');
      }
    });
  }

  navigate() {
    this.navigationService.navigateToSistemaDeTalla();
  }
}
