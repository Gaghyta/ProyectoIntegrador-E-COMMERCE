import { Component, Input } from '@angular/core';
import { Products } from 'src/app/utils/products';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent {
  @Input() pictures: Products.Pictures[] = [];
}
