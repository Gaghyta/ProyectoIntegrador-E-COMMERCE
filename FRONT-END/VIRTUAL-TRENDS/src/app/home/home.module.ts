import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsDescriptionsComponent } from './sections-descriptions/sections-descriptions.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { HomeImagesComponent } from './home-images/home-images.component';


@NgModule({
  declarations: [DashboardHomeComponent,SectionsDescriptionsComponent, HomeImagesComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }