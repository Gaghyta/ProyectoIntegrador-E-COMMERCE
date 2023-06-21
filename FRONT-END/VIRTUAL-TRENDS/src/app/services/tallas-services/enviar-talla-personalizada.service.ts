import { Injectable } from '@angular/core';
import { DniDataService } from '../data-services/dni-data.service';
import { Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnviarTallaPersonalizadaService {

  tallesPersonalizados: any

  constructor(private dni: DniDataService,
              private http: HttpClient) {

    this.tallesPersonalizados = {}
   }

   enviarTallaPersonalizada(tallas: any){

    this.dni.recibirDNI().subscribe(DNI => {
      this.tallesPersonalizados.dni = DNI
      
      console.log(this.tallesPersonalizados + " recien asignado")
    })
    
    console.log("pre edicion", this.tallesPersonalizados)

    this.tallesPersonalizados = {
      tallas,
      dni: this.tallesPersonalizados.dni
    }

    console.log("post edicion", this.tallesPersonalizados)

    this.http.put('http://localhost/api/crear-talla-personalizada', this.tallesPersonalizados).subscribe({
      next:(response_msg) => {
        console.log(response_msg)
      },
      error:(error_msg) => {
        console.error(error_msg)
      },
      complete:() => {
        console.info('envio de talla completo')
      }
    }) 




   }

}
