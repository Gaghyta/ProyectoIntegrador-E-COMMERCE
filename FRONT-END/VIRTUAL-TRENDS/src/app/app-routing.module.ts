import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './home/dashboard-home/dashboard-home.component';
import { DashboardProductsComponent } from './products/dashboard-products/dashboard-products.component';
import { PanelDeControlComponent } from './sistema-de-talla/panel-de-control/panel-de-control.component';
import { TallaPersonalizadaComponent } from './sistema-de-talla/talla-personalizada/talla-personalizada.component';
import { TallaEstandarComponent } from './sistema-de-talla/talla-estandar/talla-estandar.component';
import { DashboardContactoComponent } from './contacto/dashboard-contacto/dashboard-contacto.component';

const routes: Routes = [
  // Redirección por defecto a Home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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

    // Ruta para la página 404 cuando no encuentre la URL
  { path: '404', component: ErrorPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CuentaModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
