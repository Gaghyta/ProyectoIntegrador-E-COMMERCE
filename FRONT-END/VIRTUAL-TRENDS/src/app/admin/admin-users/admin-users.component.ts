import { GetUsersService } from 'src/app/services/admin/getUsers.service';
import { DeleteUserService } from 'src/app/services/admin/deleteUser.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit{

  idUsuarioForm = this.formBuilder.group({

    dni:['',[Validators.required, Validators.pattern('^[0-9]+$')]],

  })

  formUp: boolean = false;
  messejeInfo: string = "";
  messejeError: string = "";
  listUser: any = [];

ngOnInit(): void {
  this.listUser = this.UsersService.get().subscribe(
    {
      next:(getListUser)=>{
        this.listUser = getListUser;
      },
      error:(getListUser)=>{
        console.error(getListUser);
      },
      complete:()=>{
        console.log("Se carga lista de usuarios OK.");
      }
    }
  );
}


  constructor(private UsersService: GetUsersService, private formBuilder: FormBuilder, private deleteUserService: DeleteUserService ) {
   }

  showForm() {
  if(this.formUp == false){
    this.formUp = true;
    }
  else{
    this.formUp = false;
    }
  }


  eliminarUsuario() {
    if (this.idUsuarioForm.valid) {
      this.deleteUserService.eliminarUser(this.idUsuarioForm.value).subscribe({
        next:(deletemensaje)=>{
          console.log(deletemensaje);
        },
        error:(deletemensaje)=>{
          this.messejeInfo = "";
          this.messejeError = deletemensaje.error.error;
          ;
          },
        complete:()=>{
          this.messejeInfo = "Se eliminó el usuario correctamente.";
          this.messejeError = "";
          this.idUsuarioForm.reset();
        }
      })
    } else {
      this.messejeError = "Hay un inconveniente con la validacion del formulario, volver a verificar."
    }
  }

}


