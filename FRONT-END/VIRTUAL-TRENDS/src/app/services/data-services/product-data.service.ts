import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DniDataService } from './dni-data.service';
@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private product_info = new BehaviorSubject<any>({
    "id_producto": 0,
    "id_usuario": 0,
    "cantidad": 1,
    "talla": "X",
    "color": "Azul",
    "personalizado": false
  });

  constructor(private dni: DniDataService) { 
    this.dni.recibirDNI().subscribe(dni => {
      let datos = this.product_info.getValue();
      datos.id_usuario = dni;
      this.product_info.next(datos);
    });
  }

  enviarDatos(propiedad: string, valor: any) {
    let datos = this.product_info.getValue();
    datos[propiedad] = valor;
    this.product_info.next(datos);
  }

  recibirDatos(propiedad: string) {
    return this.product_info.pipe(map(datos => datos[propiedad]));
  }

  productoCarrito (){
    return this.product_info;
  }
}

