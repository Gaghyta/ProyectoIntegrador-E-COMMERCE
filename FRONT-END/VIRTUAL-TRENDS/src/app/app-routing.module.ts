import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
  { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'product/:id', component: DashboardProductsComponent },
  { path: 'product', component: DashboardProductsComponent },
  { path: 'sistema-de-talla', component: PanelDeControlComponent },
  { path: 'talla-personalizada', component: TallaPersonalizadaComponent },
  { path: 'talla-estandar', component: TallaEstandarComponent },
  // { path: 'cart', component: CartComponent },
  { path: 'contacto', component: DashboardContactoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
