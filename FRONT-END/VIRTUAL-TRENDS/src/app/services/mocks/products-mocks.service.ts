import { Injectable } from '@angular/core';
import { Products } from '../../utils/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsMocksService {
  
  private _products: Products.Product[];
  public get_products(): Products.Product[] {
    return this._products;
  }
  public set_products(newList: Products.Product[]) {
    this._products = newList;
  }
  
  constructor() {
    this._products = [
      {
        id: 2678,
        name: 'CORALITA ASIMÉTRICA 2678',
        description: 'Remera confeccionada en textil semi translúcido, compuesto en un  65% viscosa - 35% poliéster. El modelo utilizado es en color coral. Posee detalles en el frente y espalda, dada por un corte en el lado izquierdo que da como resultado un ruedo asimétrico.',
        price: 500,
        icon: 'src/assets/primary-pic.png',
        pictures: [
          {
            id: 1,
            src: 'src/assets/primary-pic.png'
          },
          {
            id: 2,
            src: 'src/assets/secondary-pic.png'
          },
          {
            id: 3,
            src: 'src/assets/tertiary-pic.png'
          }
        ],
        colors: ['dark-red', 'dark-green', 'dark-blue', 'purple-grey', 'orange', 'coral', 'cyan', 'black', 'white'],
        sizes: ['M', 'L', 'XL'],
        type: 'Remera'
      },
      {
        id: 2864,
        name: 'AZAFRÁN TÓXICO 2864',
        description: 'Pantalón de jean con rasgaduras elegantes. El modelo utilizado es en color rojo oscuro. Posee un estampado leve de líneas irregulares.',
        price: 600,
        icon: 'src/assets/primary-pic.png',
        pictures: [
          {
            id: 1,
            src: 'src/assets/primary-pic.png'
          },
          {
            id: 2,
            src: 'src/assets/secondary-pic.png'
          },
          {
            id: 3,
            src: 'src/assets/tertiary-pic.png'
          }
        ],
        colors: ['dark-red', 'dark-green', 'dark-blue', 'purple-grey', 'orange', 'coral', 'cyan', 'black', 'white'],
        sizes: ['S', 'M', 'L', 'XL'],
        type: 'Pantalón'
      },
      {
        id: 2543,
        name: 'PANTERA OSCURA ALARGADAS 2543',
        description: 'Guantes de cuero ecológico con un brillo peculiar. Con un largo de 30cm, estos guantes recubren el antebrazo apegándose al mismo. El modelo utilizado es en negro.',
        price: 300,
        icon: 'src/assets/primary-pic.png',
        pictures: [
          {
            id: 1,
            src: 'src/assets/primary-pic.png'
          },
          {
            id: 2,
            src: 'src/assets/secondary-pic.png'
          },
          {
            id: 3,
            src: 'src/assets/tertiary-pic.png'
          }
        ],
        colors: ['dark-red', 'dark-green', 'dark-blue', 'purple-grey', 'orange', 'coral', 'cyan', 'black', 'white'],
        sizes: ['S', 'M', 'L', 'XL'],
        type: 'Accesorio'
      },
    ];
  }
}
