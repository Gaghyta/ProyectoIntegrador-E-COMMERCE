import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /*isVisible = false;*/
  constructor(private navigationService: NavigationService){}
  ngOnInit(): void {
  }

  navigate() {
    this.navigationService.navigateToProducts();
  }

  navigateToContacto(){
    this.navigationService.navigateToContacto();  
  }

  navigateToCuenta(){
    this.navigationService.navigateToCuenta();  
  }
}