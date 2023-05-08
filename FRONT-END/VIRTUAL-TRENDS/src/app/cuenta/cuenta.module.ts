import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLogupComponent } from './login-logup/login-logup.component';
import { RegistroComponent } from './registro/registro.component';



@NgModule({
  declarations: [
    LoginLogupComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CuentaModule { }
