import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './home/dashboard-home/dashboard-home.component';
import { DashboardIndividualProductComponent } from './products/dashboard-individual-product/dashboard-individual-product.component';
import { PanelDeControlComponent } from './sistema-de-talla/panel-de-control/panel-de-control.component';
import { TallaPersonalizadaComponent } from './sistema-de-talla/talla-personalizada/talla-personalizada.component';
import { TallaEstandarComponent } from './sistema-de-talla/talla-estandar/talla-estandar.component';
import { DashboardContactoComponent } from './contacto/dashboard-contacto/dashboard-contacto.component';
import { DashboardAllProductsComponent } from './products/dashboard-all-products/dashboard-all-products.component';
import { LoginLogupComponent } from './cuenta/login-logup/login-logup.component';
import { CuentaModule } from './cuenta/cuenta.module';
import { RegistroComponent } from './cuenta/registro/registro.component';

const routes: Routes = [
  // Redirección por defecto a Home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/sistema-de-talla', pathMatch: 'full'},
  // Ruta para la página 404 cuando no encuentre la URL
  //{ path: '**', component: Pagina404Component },

  // Rutas de los componentes
  { path: 'home', component: DashboardHomeComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'cuenta', component: LoginLogupComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'registro', component: RegistroComponent },
  // { path: 'product/:id', component: DashboardIndividualProductComponent },
  { path: 'product', component: DashboardIndividualProductComponent },
  { path: 'products', component: DashboardAllProductsComponent},
  { path: 'sistema-de-talla', component: PanelDeControlComponent },
  { path: 'talla-personalizada', component: TallaPersonalizadaComponent },
  { path: 'talla-estandar', component: TallaEstandarComponent },
  // { path: 'cart', component: CartComponent },
  { path: 'contacto', component: DashboardContactoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CuentaModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
