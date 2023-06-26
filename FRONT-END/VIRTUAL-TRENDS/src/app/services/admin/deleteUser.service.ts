import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  // reveer la ruta

  constructor(private http : HttpClient) { }
    eliminarUser(dni:any):Observable<any> {
      return this.http.post("http://localhost:8000/api/usuarios/eliminar/", dni);
  }
}

