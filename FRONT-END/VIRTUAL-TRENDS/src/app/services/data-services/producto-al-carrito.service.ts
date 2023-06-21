import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DniDataService } from './dni-data.service';
type productoCarrito = { 
  id_prod: number,
  id_car: number,
  nombre: string,
  precio: number,
  cantidad: number,
  talla: string,
  color: string,
  espersonalizad: boolean
  }
@Injectable({
  providedIn: 'root'
})

export class ProductoAlCarritoService {

  dniRecibido: number = 0;


  contenidoCarrito: productoCarrito[]=[];


  precioSubtotal: number = 0;


  constructor(private http: HttpClient, private dniData: DniDataService) {



  }


  getCarrito() {

    this.dniData.recibirDNI().subscribe(dniTemp => {
      this.http.get<productoCarrito[]>(`http://localhost:8000/api/consultar-carrito/?dni=${dniTemp}`).subscribe(carrito => {
        this.contenidoCarrito = carrito
      })
    });
    this.precioSubtotal=0;
    this.contenidoCarrito.forEach(Precio => {
      this.precioSubtotal += Precio.precio;
    });
    return this.contenidoCarrito;
  }
}
