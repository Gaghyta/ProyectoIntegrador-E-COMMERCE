import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../../utils/products';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
    
  }

  public get(url: string) {
    return this.http.get(url); // GET
  }
}
