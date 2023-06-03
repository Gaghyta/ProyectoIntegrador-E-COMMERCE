import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
    
  }

  public get() {
    /** Método GET para obtener todos los productos.*/
    return this.http.get(this.apiUrl);
  }
}
