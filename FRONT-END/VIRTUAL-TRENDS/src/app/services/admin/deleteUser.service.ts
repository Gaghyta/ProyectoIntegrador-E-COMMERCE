import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  // reveer la ruta
  private apiUsers = 'http://localhost:8000/api/usuarios/eliminar/';


  constructor(private http : HttpClient) { }
    eliminarUser(id:any):Observable<any> {
      return this.http.delete(this.apiUsers, id);
  }
}


