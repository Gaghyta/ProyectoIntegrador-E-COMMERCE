import { Component, OnInit, ɵcoerceToBoolean } from '@angular/core';
import { SwPersonalizadoService } from 'src/app/services/sw-personalizado.service';

@Component({
  selector: 'app-talla-personalizada',
  templateUrl: './talla-personalizada.component.html',
  styleUrls: ['./talla-personalizada.component.css']

})
export class TallaPersonalizadaComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(private personalizadoSS: SwPersonalizadoService){

  }
  
  cerrarPersonalizado(){

    this.personalizadoSS.$tallePersonalizado.emit(false)

  }

}
