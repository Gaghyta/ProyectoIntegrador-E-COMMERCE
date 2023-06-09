import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/data-services/producto-al-carrito.service';

@Component({
  selector: 'app-pantalla-del-carrito',
  templateUrl: './pantalla-del-carrito.component.html',
  styleUrls: ['./pantalla-del-carrito.component.css']
})
export class PantallaDelCarritoComponent implements OnInit {
  productos: any[] = [];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    const dni = '123456789'; 

    this.carritoService.getCarrito(dni)
      .then(productos => this.productos = productos)
      .catch(error => console.error(error));
  }
}