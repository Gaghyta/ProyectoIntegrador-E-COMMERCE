import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ProductsModule } from '../products/products.module';
import { AdminProductsFormComponent } from './admin-products/admin-products-form/admin-products-form.component';
import { CuentaModule } from '../cuenta/cuenta.module';
import { UserCardModule } from '../cuenta/user-card/user-card.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    AppRoutingModule,
    ProductsModule,
    CuentaModule,
    UserCardModule,
    ReactiveFormsModule
  ],
  declarations: [AdminComponent, AdminProductsComponent, AdminUsersComponent, AdminProductsFormComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AdminModule { }
