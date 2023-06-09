import { Injectable } from '@angular/core';
import { DniDataService } from '../data-services/dni-data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnviarTallaPersonalizadaService {

  tallesPersonalizados: any

  constructor(private dni: DniDataService,
              private http: HttpClient) {

    this.tallesPersonalizados = {}
    this.dni.recibirDNI().subscribe(DNI => {
      this.tallesPersonalizados.dni = DNI
    })
   }

   enviarTallaPersonalizada(tallas: any){
    this.tallesPersonalizados = {...tallas}
    this.http.put('http://localhost/api/crear-talla-personalizada', this.tallesPersonalizados)
    const tallesJSON = JSON.stringify(this.tallesPersonalizados);
    console.log(tallesJSON);

   }

}
