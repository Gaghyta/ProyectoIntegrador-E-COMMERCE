import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsDescriptionsComponent } from './sections-descriptions/sections-descriptions.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { HomeImagesComponent } from './home-images/home-images.component';
import { SectionCategoriesProductsComponent } from './section-categories-products/section-categories-products.component';


@NgModule({
  declarations: [DashboardHomeComponent,SectionsDescriptionsComponent,SectionCategoriesProductsComponent,HomeImagesComponent],
  imports: [
    CommonModule,
  ]
})
export class HomeModule { }