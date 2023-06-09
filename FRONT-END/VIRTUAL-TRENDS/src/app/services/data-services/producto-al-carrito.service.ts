import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable()
export class CarritoService {
  getCarrito(dni: string): Promise<any> {
    return axios.get(`/ruta-de-consulta/?dni=${dni}`)
      .then(response => response.data)
      .catch(error => {
        throw new Error(error.response.data.error);
      });
  }
}
