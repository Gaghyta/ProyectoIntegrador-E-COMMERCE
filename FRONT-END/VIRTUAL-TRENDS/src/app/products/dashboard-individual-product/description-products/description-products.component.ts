import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-products',
  templateUrl: './description-products.component.html',
  styleUrls: ['./description-products.component.css']
})
export class DescriptionProductsComponent {
  @Input() title: string = '';
  @Input() description: string = '';

  constructor() { }
}
