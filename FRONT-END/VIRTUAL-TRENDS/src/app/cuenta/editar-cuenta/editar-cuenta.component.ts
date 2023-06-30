import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioEditService } from 'src/app/services/usuario/usuario-edit.service';
import { Component, OnInit, Input } from '@angular/core';
import { UsuarioVerService } from 'src/app/services/usuario/usuario-ver.service';
@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})


export class EditarCuentaComponent implements OnInit{

  idUsuarioForm= this.formBuilder.group({
    dni: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],


    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    calle: ['', Validators.required],
    altura: ['', Validators.required],
    ph: ['', Validators.required],
    cp: ['', Validators.required],
    ciudad: ['', Validators.required],
    provincia: ['', Validators.required],
    tel: ['', Validators.pattern('[0-9]{10}')],
  })

  MensajeInfo: string ="";
  MensajeError: string ="";
  userToSend = {}

  constructor(private formBuilder: FormBuilder, private UsuarioEditService: UsuarioEditService, private recibirDatosDeUsuario: UsuarioVerService ) {
  }

  editUser (){
    //if (this.idUsuarioForm.valid) {

      this.userToSend = {
        dni: this.idUsuarioForm.get("dni")?.value,
        nombre: this.idUsuarioForm.get("nombre")?.value,
        apellido: this.idUsuarioForm.get("apellido")?.value,
        dir_calle: this.idUsuarioForm.get("calle")?.value,
        dir_numero: this.idUsuarioForm.get("altura")?.value,
        ph: this.idUsuarioForm.get("ph")?.value,
        cp: this.idUsuarioForm.get("cp")?.value,
        ciudad: this.idUsuarioForm.get("ciudad")?.value,
        provincia: this.idUsuarioForm.get("provincia")?.value,
        tel: this.idUsuarioForm.get("tel")?.value
      }
      console.log("editando usuario", this.userToSend)

      this.UsuarioEditService.editarUsuario (this.userToSend).subscribe ({
        next:(editmensaje)=>{
          console.log(editmensaje);
        },
        error:(editmensaje)=>{
          this.MensajeInfo="";
          this.MensajeError=editmensaje.error.error;
        },
        complete:()=> {
          this.MensajeInfo = "Datos actualizados";
          this.MensajeError ="";
          this.idUsuarioForm.reset();
        }
      })
    //} else {
    //  this.MensajeError = "Ocurrió un problema con la carga de datos, inténtelo más tarde."
    //}
  }


  ngOnInit(): void {
    console.log(this.recibirDatosDeUsuario.recibirDatosDeUsuario());
    var obj = this.recibirDatosDeUsuario.recibirDatosDeUsuario();
    this.idUsuarioForm.setValue(
      {
        dni: obj.dni,
        nombre: obj.nombre,
        apellido: obj.apellido,
        calle: obj.dir_calle,
        altura: obj.dir_numero,
        ph: obj.ph,
        cp: obj.cp,
        ciudad: obj.ciudad,
        provincia: obj.provincia,
        tel: obj.tel_cel
      }
    )

  }
}
