import { Component } from '@angular/core';

type Color = null | 'dark-red' | 'dark-green' | 'dark-blue' | 'purple-grey' | 'orange' | 'salmon' | 'cyan';

@Component({
  selector: 'app-cards-products',
  templateUrl: './cards-products.component.html',
  styleUrls: ['./cards-products.component.css']
})

export class CardsProductsComponent {
  selectedColor: Color = null;
  constructor() { }

  selectColor(color: Color) {
    this.selectedColor = color;
  }
}
