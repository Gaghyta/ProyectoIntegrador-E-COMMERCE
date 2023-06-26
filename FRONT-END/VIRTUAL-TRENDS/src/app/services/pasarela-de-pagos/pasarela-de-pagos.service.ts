import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasarelaDePagosService {
  private apiUrl = 'http://localhost:8000/api/pago/status/';

  constructor(private http: HttpClient) {
    
  }

  public post(data: any) {
    /** Método GET para saber si la compra fue aprobada.*/
    return this.http.post(this.apiUrl, {data: data});
  }
}
