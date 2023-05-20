import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { DescriptionProductsComponent } from './dashboard-individual-product/description-products/description-products.component';
import { DashboardIndividualProductComponent } from './dashboard-individual-product/dashboard-individual-product.component';
import { CardsProductsComponent } from './dashboard-individual-product/cards-products/cards-products.component';
import { PicturesComponent } from './dashboard-individual-product/pictures/pictures.component';
import { RouterLink, RouterModule } from '@angular/router';
import { DashboardAllProductsComponent } from './dashboard-all-products/dashboard-all-products.component';
import { ProductCardComponent } from './dashboard-all-products/product-card/product-card.component';

@NgModule({
  declarations: [DashboardIndividualProductComponent, DescriptionProductsComponent, CardsProductsComponent, PicturesComponent, DashboardAllProductsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    AppRoutingModule
  ]
})
export class ProductsModule { }
