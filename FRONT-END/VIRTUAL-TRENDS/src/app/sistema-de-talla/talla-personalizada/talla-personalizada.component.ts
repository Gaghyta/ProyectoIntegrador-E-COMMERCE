import { Component, OnInit, ɵcoerceToBoolean } from '@angular/core';
import { SwPersonalizadoService } from 'src/app/services/sw-personalizado.service';
import { ProductDataService } from 'src/app/services/data-services/product-data.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms'
import { ProductCarritoService } from 'src/app/services/data-services/product-carrito.service';
import { EnviarTallaPersonalizadaService } from 'src/app/services/tallas-services/enviar-talla-personalizada.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-talla-personalizada',
  templateUrl: './talla-personalizada.component.html',
  styleUrls: ['./talla-personalizada.component.css']

})
export class TallaPersonalizadaComponent implements OnInit{

  form: any

  ngOnInit(): void {
    
  }
  constructor(private personalizadoSS: SwPersonalizadoService,
              private productData: ProductDataService,
              private navigation: NavigationService,
              private formBuilder: FormBuilder,
              private productCarrito: ProductCarritoService,
              private enviarPersonalizada: EnviarTallaPersonalizadaService)
              {

                this.form = this.formBuilder.group({
                  cuello:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  busto:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  conRodilla:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  largTalle:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  conCintura:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  conCadera:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  largManga:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  conMuneca:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  largPierna:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                  alturaRodilla:[0,[Validators.required, Validators.max(99), Validators.min(1)]],
                })

  }

  get Cuello(){

    return this.form.get("cuello")

  }
  
  get Busto(){

    return this.form.get("busto")

  }
  
  get ConRodilla(){

    return this.form.get("conRodilla")

  }
  
  get LargTalle(){

    return this.form.get("largTalle")

  }
  
  get ConCintura(){

    return this.form.get("conCintura")

  }
  
  get ConCadera(){

    return this.form.get("conCadera")

  }
  
  get LargManga(){

    return this.form.get("largManga")

  }
  
  get ConMuneca(){

    return this.form.get("conMuneca")

  }
  
  get LargPierna(){

    return this.form.get("largPierna")

  }
  
  get AlturaRodilla(){

    return this.form.get("alturaRodilla")

  }

  get tallaPersonalizada(): any {

    return this.form.value;
  
  }
  
  cerrarPersonalizado(){

    this.personalizadoSS.$tallePersonalizado.emit(false)

  }

  onEnviar(event: Event){
    event.preventDefault();
    if(this.form.valid){
      alert("enviando")
    }
    else{
      this.form.markAllAsTouched()
    }
  }

  agregar_al_carrito() {
    if (this.form.valid) {
      this.productData.enviarDatos('talla', 'P');
      this.productData.enviarDatos('personalizado', true);
      this.enviarPersonalizada.enviarTallaPersonalizada(this.tallaPersonalizada);
      console.log("form enviado:", this.tallaPersonalizada)
      this.productCarrito.datosProducto()
      this.productCarrito.agregarCarrito();
      this.navigation.navigateToCarrito();
    }
  }

}
