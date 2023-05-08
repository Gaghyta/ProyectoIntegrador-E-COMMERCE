import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
/*import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';*/
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { SistemaDeTallaModule } from './sistema-de-talla/sistema-de-talla.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [		
    AppComponent
      /*HeaderComponent,
      FooterComponent*/
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    SistemaDeTallaModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }