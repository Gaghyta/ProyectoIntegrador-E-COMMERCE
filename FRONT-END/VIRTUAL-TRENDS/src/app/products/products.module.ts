import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionProductsComponent } from './description-products/description-products.component';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { CardsProductsComponent } from './cards-products/cards-products.component';
import { PicturesComponent } from './pictures/pictures.component';

@NgModule({
  declarations: [DashboardProductsComponent, DescriptionProductsComponent, CardsProductsComponent, PicturesComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
