import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwPersonalizadoService {

  constructor() { }

  $tallePersonalizado = new EventEmitter<any>();
}
