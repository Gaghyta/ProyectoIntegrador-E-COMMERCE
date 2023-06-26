import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation/navigation.service';
import { PasarelaDePagosService } from '../services/pasarela-de-pagos/pasarela-de-pagos.service';
import { ProductsFactoryService } from '../services/products-services/productsFactory.service';

@Component({
  selector: 'app-pasarela-pagos',
  templateUrl: './pasarela-pagos.component.html',
  styleUrls: ['./pasarela-pagos.component.css']
})
export class PasarelaPagosComponent implements OnInit {
  showTarjetaForm: boolean = false;
  showEfectivoText: boolean = false;
  visaValidation: boolean = false;
  masterCardValidation: boolean = false;
  americanExpressValidation: boolean = false;
  securityCodeValidation: boolean = false;
  ownerValidation: boolean = false;
  dueDateValidationM: boolean = false;
  dueDateValidationY: boolean = false;

  constructor(private navigate: NavigationService, private PasarelaDePagosService: PasarelaDePagosService, private productsFactoryService: ProductsFactoryService) { }

  ngOnInit() {
  }

  navigateToCarrito() {
    this.navigate.navigateToCarrito();
  }

  navigateToTYP() {
    let products = this.productsFactoryService.getProductCarrito();
    this.PasarelaDePagosService.post(products).subscribe(
      {
        next: (data) => {
        }
      }
    );
    this.navigate.navigateToTYP();
  }

  checkRadioButton(e: any) {
    let radioTarjeta = document.getElementById('radio-button-tarjeta');
    let radioEfectivo = document.getElementById('radio-button-efectivo');

    if (e.target.id == 'radio-button-tarjeta') {;
      (radioEfectivo as HTMLInputElement).checked = false;
      this.showEfectivoText = false;
      this.showTarjetaForm = true;
    }
    else if (e.target.id == 'radio-button-efectivo') {
      (radioTarjeta as HTMLInputElement).checked = false;
      this.showTarjetaForm = false;
      this.showEfectivoText = true;
    }
  }

  validateOwner() {
    // Regex only letters
    let owner = document.getElementById('card-owner');
    this.ownerValidation = (/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g).test((owner as HTMLInputElement).value) && (owner as HTMLInputElement).value.length !== 0;
  }

  validateCardNumber() {
    let cardNumber = document.getElementById('card-number');
    this.visaValidation = (/\b4[0-9]{12}(?:[0-9]{3})?\b/).test((cardNumber as HTMLInputElement).value);
    this.masterCardValidation = (/\b5[1-5][0-9]{14}\b/).test((cardNumber as HTMLInputElement).value);
    this.americanExpressValidation = (/\b3[47][0-9]{13}\b/).test((cardNumber as HTMLInputElement).value);
  }

  validateSecurityCode() {
    let securityCode = document.getElementById('security-code');
    this.securityCodeValidation = (/\b[0-9]{3}\b/).test((securityCode as HTMLInputElement).value);
  }

  validateDueDateM() {
    let dueDate1 = document.getElementById('due-date-m');
    // Month validation (1-12)
    this.dueDateValidationM = (/(^0?[1-9]$)|(^1[0-2]$)/).test((dueDate1 as HTMLInputElement).value);

  }

  validateDueDateY() {
    let dueDate2 = document.getElementById('due-date-y');
    this.dueDateValidationY = (/^[0-9]{2}$/).test((dueDate2 as HTMLInputElement).value) && Number((dueDate2 as HTMLInputElement).value) >= 24;
  }
}
