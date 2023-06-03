import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecibirTallasService {

  constructor(private http:HttpClient) { 

  }
  tallasDisponibles: string[] = [
    "XS",
    "M",
    "XL"
  ]

  enviarTallasDisponibles(){
    return this.tallasDisponibles
  }
}
