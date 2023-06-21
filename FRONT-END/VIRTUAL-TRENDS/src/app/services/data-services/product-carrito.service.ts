import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDataService } from './product-data.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductCarritoService {

  constructor(private http: HttpClient, private productData: ProductDataService) { }

  datos_del_producto: any;


  datosProducto(){

    this.productData.productoCarrito().subscribe(Producto => {

      this.datos_del_producto = Producto

    })

  }
  

  agregarCarrito(){
      console.log(this.datos_del_producto)
      this.http.post('http://localhost:8000/api/producto-al-carrito/', this.datos_del_producto).subscribe(
        response => {
          console.log("La solicitud POST se realizó con éxito.");
          console.log(response); 

        },
        error => {
          console.error("Error al realizar la solicitud POST:", error);
        }
      );
  }

  /*agregarCarrito(producto: any): Observable<any>{

    return this.http.post('http://localhost:8000/api/producto-al-carrito/', producto);

  }
*/
}