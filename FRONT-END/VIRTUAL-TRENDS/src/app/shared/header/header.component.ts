import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /*isVisible = false;*/
  constructor(){}
  ngOnInit(): void {
  }

  navigate() {
    this.navigationService.navigateToProducts();
  }

  navigateContacto(){
    this.navigationService.navigateToContacto();
  }

  navigateToCuenta(){
    this.navigationService.navigateToCuenta();
  }
}
