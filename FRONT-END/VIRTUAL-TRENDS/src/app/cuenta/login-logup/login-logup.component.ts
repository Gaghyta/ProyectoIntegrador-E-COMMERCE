import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-login-logup',
  templateUrl: './login-logup.component.html',
  styleUrls: ['./login-logup.component.css']
})
export class LoginLogupComponent {
  constructor(private navigationService: NavigationService) {}

  navigateToRegistro() {
    this.navigationService.navigateToRegistro();
  }
}
