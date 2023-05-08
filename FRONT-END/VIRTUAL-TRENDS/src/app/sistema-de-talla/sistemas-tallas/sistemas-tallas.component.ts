import { Component, OnInit} from '@angular/core';
import { SwEstandarService } from 'src/app/services/sw-estandar.service';
import { SwPersonalizadoService } from 'src/app/services/sw-personalizado.service';

@Component({
  selector: 'app-sistemas-tallas',
  templateUrl: './sistemas-tallas.component.html',
  styleUrls: ['./sistemas-tallas.component.css']
})
export class SistemasTallasComponent implements OnInit {

  ngOnInit(): void {

    this.estandarSS.$tallaEstandar.subscribe((valor)=>{this.tofEstandar = valor});
    
    this.personalizadoSS.$tallePersonalizado.subscribe((valor)=> {this.tofPersonalizado = valor});
  }
  

  tofEstandar:boolean = false;
  tofPersonalizado:boolean = false;

  abrirEstandar(){
    this.tofEstandar = true;

  }
  abrirPersonalizado(){

    this.tofPersonalizado = true;

  }
 
  constructor(private estandarSS: SwEstandarService, private personalizadoSS: SwPersonalizadoService){

  }


}
