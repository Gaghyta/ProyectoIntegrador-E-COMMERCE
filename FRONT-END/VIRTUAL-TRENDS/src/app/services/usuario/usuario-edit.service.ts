import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioEditService {
  constructor(private http : HttpClient) {}
    editarUser(dni:any):Observable<any> {
      return this.http.put("http://localhost:8000/api/usuarios/update/", dni);
    }

    verUser(dni:any):Observable<any> {
      return this.http.get("http://localhost:8000/api/ver-usuario/?dni=${dniTemp}");
    }
  }



