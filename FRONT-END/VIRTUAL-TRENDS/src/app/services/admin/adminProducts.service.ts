import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id_prod?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenes: string[];
  colores: string[];
  tallas: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8000/api/products/';
  private apiUrlUpdate = 'http://localhost:8000/api/products/update/';
  private apiUrlDelete = 'http://localhost:8000/api/products/delete/';
  private apiUrlAdd = 'http://localhost:8000/api/products/add/';

  constructor(private http: HttpClient) {
    
  }

  public get(id_producto: string) {
    /** Método GET para obtener un producto específico a modificar.*/
    return this.http.get(this.apiUrl + id_producto);
  }

  public update(datos: Product) {
    /** Método PUT para modificar un producto específico.*/
    return this.http.put(this.apiUrlUpdate, datos);
  }

  public delete(id_prod: number) {
    /** Método DELETE para eliminar un producto específico.*/
    return this.http.put(this.apiUrlDelete, {id_prod: id_prod});
  }

  public add(datos: Product) {
    /** Método POST para agregar un producto.*/
    return this.http.post(this.apiUrlAdd, datos);
  }

}
