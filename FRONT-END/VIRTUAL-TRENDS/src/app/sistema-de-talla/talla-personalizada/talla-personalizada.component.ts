import { Component, OnInit } from '@angular/core';
import { SwPersonalizadoService } from 'src/app/services/sw-personalizado.service';

@Component({
  selector: 'app-talla-personalizada',
  templateUrl: './talla-personalizada.component.html',
  styleUrls: ['./talla-personalizada.component.css']
})
export class TallaPersonalizadaComponent implements OnInit{

  constructor(private personalizadoSS: SwPersonalizadoService){

  }

  ngOnInit(): void {
    
  }

  cerrarPersonalizado(){

    this.personalizadoSS.$tallePersonalizado.emit(false)

  }

}
