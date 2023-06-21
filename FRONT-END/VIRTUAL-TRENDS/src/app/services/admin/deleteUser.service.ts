import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  // reveer la ruta
  private apiUsers = 'http://localhost:8000/api/usuario/eliminar/';


  constructor(private http : HttpClient) { }
  public delete() {
    return this.http.delete(this.apiUsers);
  }
}


