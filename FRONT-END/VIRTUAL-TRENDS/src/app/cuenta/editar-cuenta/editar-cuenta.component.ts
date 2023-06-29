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
    altura: ['', Validators.required, Validators.pattern('^[0-9]+$')],
    ph: ['', Validators.required],
    cp: ['', Validators.required],
    ciudad: ['', Validators.required],
    provincia: ['', Validators.required],
    telefono: ['', Validators.pattern('[0-9]{10}')],
  })

  MensajeInfo: string ="";
  MensajeError: string ="";

  constructor(private formBuilder: FormBuilder, private UsuarioEditService: UsuarioEditService, private recibirDatosDeUsuario: UsuarioVerService ) {
  }

  editUser (){
    if (this.idUsuarioForm.valid) {
      this.UsuarioEditService.editarUser (this.idUsuarioForm.value).subscribe ({
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
    } else {
      this.MensajeError = "Ocurrió un problema con la carga de datos, inténtelo más tarde."
    }
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
        telefono: obj.tel_cel
      }
    )}
}
