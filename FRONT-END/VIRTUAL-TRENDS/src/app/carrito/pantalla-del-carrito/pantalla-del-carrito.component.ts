import { Component, OnInit } from '@angular/core';
import { ProductoAlCarritoService } from '../../services/data-services/producto-al-carrito.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ProductsFactoryService } from 'src/app/services/products-services/productsFactory.service';

@Component({
  selector: 'app-pantalla-del-carrito',
  templateUrl: './pantalla-del-carrito.component.html',
  styleUrls: ['./pantalla-del-carrito.component.css']
})
export class PantallaDelCarritoComponent implements OnInit {
  
  productos: any;
  ver_carrito: boolean=false;
  estado_button_carrito:string='VER CARRITO';

  constructor(public productosCarrito: ProductoAlCarritoService, private navigation: NavigationService, private productsFactoryService: ProductsFactoryService) {
    
   }


  ngOnInit(): void {

    this.productos=this.productosCarrito.getCarrito()
    // Es para borrar el carrito
    this.productsFactoryService.saveProductCarrito(this.productos);

  }

  
  abrirCarrito(){

    this.ver_carrito=!this.ver_carrito
    if (this.ver_carrito){
      
      this.estado_button_carrito='OCULTAR CARRITO'
    }
    else {
      
      this.estado_button_carrito='VER CARRITO'
    }
    this.productos=this.productosCarrito.getCarrito()
    debugger;
    this.productsFactoryService.saveProductCarrito(this.productos);

  }
  


  navigate() {
    this.navigation.navigateToPasarelaDePagos();
  }
}
