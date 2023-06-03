import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private product_ID = new BehaviorSubject<any>({
    "id_producto": 0,
    "id_usuario": 0,
    "cantidad": 0,
    "talla": "",
    "personalizado": false
  });

  constructor() { }

  enviarDatos(propiedad: string, valor: any) {
    let datos = this.product_ID.getValue();
    datos[propiedad] = valor;
    this.product_ID.next(datos);
  }

  recibirDatos(propiedad: string) {
    return this.product_ID.pipe(map(datos => datos[propiedad]));
  }
}
