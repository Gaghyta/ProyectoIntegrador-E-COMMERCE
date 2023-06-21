import { Component, OnInit, ɵcoerceToBoolean } from '@angular/core';
import { SwEstandarService } from 'src/app/services/sw-estandar.service';
import { RecibirTallasService } from 'src/app/services/tallas-services/recibir-tallas.service';
import { ProductDataService } from 'src/app/services/data-services/product-data.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ProductCarritoService } from 'src/app/services/data-services/product-carrito.service';

@Component({
  selector: 'app-talla-estandar',
  templateUrl: './talla-estandar.component.html',
  styleUrls: ["./talla-estandar.component.css"]
})
export class TallaEstandarComponent implements OnInit{

  constructor (
    private estandarSS: SwEstandarService,
    private recibirTallas: RecibirTallasService, 
    private productData: ProductDataService,
    private navigation: NavigationService,
    private productCarrito: ProductCarritoService,
    ){

  }

  seleccionado: string = ""
  activos: any[] = []
  product_ID: any
  colorSeleccionado: string = ''
  stock: number = 0

  ngOnInit() {
    this.productData.recibirDatos("id_producto").subscribe(dato => {
      this.product_ID = dato;
    });
    this.recibirTallas.enviarTallasDisponibles().subscribe(tallas => {
      this.activos = tallas
    });
    this.productData.recibirDatos("color").subscribe(dato => {
      this.colorSeleccionado = dato;
    });
    this.productData.recibirDatos("cantidad").subscribe(dato => {
      this.stock = dato;
    });

    this.seleccionado = "sin seleccionar"
  }

  esActivo(talle: string){
    return this.activos.includes(talle)
  }

  toggleSeleccionado(talle: string){
    if(this.esActivo(talle)){
      this.seleccionado = talle
    }

  }

  cerrarEstandar(){

    this.estandarSS.$tallaEstandar.emit(false)

  }

  agregar_al_carrito(){
    console.log(this.activos)
    console.log(this.seleccionado)
    if (this.seleccionado !== "sin seleccionar" && this.seleccionado !=="error"){  

      this.productData.enviarDatos('talla', this.seleccionado)
      this.productData.enviarDatos('personalizado', false)
      this.productCarrito.datosProducto()
      this.productCarrito.agregarCarrito()
      this.navigation.navigateToCarrito()

    }
    else{
      this.seleccionado = "error"
    }
  }

  get Seleccionado(){
    return this.seleccionado
  } 

}