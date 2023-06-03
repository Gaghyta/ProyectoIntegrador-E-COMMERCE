import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CuentaModule } from 'src/app/cuenta/cuenta.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CuentaModule,
  ]
})
export class SharedModule { }