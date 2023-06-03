import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-login-logup',
  templateUrl: './login-logup.component.html',
  styleUrls: ['./login-logup.component.css']
})
export class LoginLogupComponent {
  public showRecoverPassText: boolean = false;
  constructor(private navigationService: NavigationService) {}

  navigateToRegistro() {
    this.navigationService.navigateToRegistro();
  }

  closePopUp() {
    this.navigationService.navigateToHome();
  }

  showRecoverPass() {
    this.showRecoverPassText = !this.showRecoverPassText;
  }
}
