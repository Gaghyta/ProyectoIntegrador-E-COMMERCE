import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { UsuarioVerService } from 'src/app/services/usuario/usuario-ver.service';

@Component({
  selector: 'app-ver-cuenta',
  templateUrl: './ver-cuenta.component.html',
  styleUrls: ['./ver-cuenta.component.css']
})
export class VerCuentaComponent {
  public showEditarCuenta: boolean = false;
  public cuentaData: any

  /*
  public cuentaData: any = {

    dni: 50000,
    nombre: 'Rosalia',
    apellido: 'De las Montañas',
    tel_cel: 11111111,
    dir_calle: 'Calle falsa',
    dir_numero: 123,
    cp: 1111,
    ciudad: 'Ciudad falsa',
    provincia: 'Provincia falsa',
    ph: '-',
    id_lvl: 0

  }
  */

  ver_usuario: boolean = false;
  estado_button_usuario: string ='VER INFORMACION';
  user_data: any;

  constructor(
    private navigationService: NavigationService,
    private cuentaTemp: UsuarioVerService,
    private loginService: LoginService) {}

  ngOnInit() {
    
    this.cuentaData = this.cuentaTemp.recibirDatosDeUsuario()
    this.loginService.userData.subscribe(response => {
      this.user_data = response
    })
    console.log(this.user_data.id_lvl)

  }

  closePopUp() {
    this.navigationService.navigateToHome();
  }

  showEditarCuentaForm() {
    this.showEditarCuenta = !this.showEditarCuenta;
  }

  navigateToAdmin(){
    this.navigationService.navigateToAdmin();
  }

  toggleInfoUsuario(){
    this.ver_usuario = !this.ver_usuario
    if(this.ver_usuario){

      this.estado_button_usuario='OCULTAR INFORMACION'
      
      this.cuentaData = this.cuentaTemp.recibirDatosDeUsuario()

    }
    else{

      this.estado_button_usuario='VER INFORMACION'

    }
  }

  logout() {
    this.loginService.logout();
  }


}
