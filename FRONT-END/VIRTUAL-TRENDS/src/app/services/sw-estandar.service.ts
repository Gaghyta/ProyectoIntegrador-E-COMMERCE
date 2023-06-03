import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwEstandarService {

  constructor() { }

  $tallaEstandar = new EventEmitter<any>();

}
