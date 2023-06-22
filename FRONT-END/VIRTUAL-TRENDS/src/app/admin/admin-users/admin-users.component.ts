import { GetUsersService } from 'src/app/services/admin/getUsers.service';
import { DeleteUserService } from 'src/app/services/admin/deleteUser.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  public formType: string = '';
  // usuario: usuario.usuario[] = [];
  @Input() type: string = '';
  users = [];
  public mensajeEnviado: boolean = false;
  idUsuarioForm= this.formBuilder.group  ({
    idUsuario: ['', Validators.required, Validators.pattern('^[0-9]+$')],
  });
  idUser: any;
  // id_User: string = '';
  idUsuarioInvalid: boolean = false;
  mensajeEliminado: boolean = false;




  constructor(private UsersService: GetUsersService, private formBuilder: FormBuilder, private deleteUserService: DeleteUserService ) {
   }

  ngOnInit() {
    this.UsersService.get().subscribe((data: any) => {
      this.users = data;
      Array.from(this.users).forEach((user: any) => {
        user.dni = (user.dni).toLocaleString();
        user.dni = user.dni.split(',').join('.');
              });

    }
    );

  }
  showForm(id: string) {
    this.formType = 'delete';
  }
  eliminarUsuario() {

    if (this.idUsuarioForm.valid) {
      this.deleteUserService.eliminarUser(this.idUsuarioForm.value).subscribe({
        next:(deletemensaje)=>{
          console.log(deletemensaje);
        },
        error:(deletemensaje)=>{
          console.error(deletemensaje);
          },
        complete:()=>{
          console.info("eliminado satisfactoriamente");
        }
      })
    } else {
      this.idUsuarioInvalid = true;
    }
  }

  get idUsuario() {
    return this.idUsuarioForm.controls['idUsuario'];

  }
  // validateIdUserDelete() {
  //   const id_prod_delete = (document.getElementById('id-producto-delete') as HTMLInputElement).value;
  //   this.idUserValidationDelete = id_prod_delete.length > 0 && (/^[0-9]+$/g).test(id_prod_delete);
  // }

  // deleteUser() {
  //   this.id_User = (document.getElementById('idUsuario') as HTMLInputElement).value;
  //   this.deleteUserService.delete(Number(this.id_User)).subscribe((data: any) => {
  //     this.showNotFoundTextDelete = false;
  //     this.showSuccessTextDelete = true;
  //   }, error => {
  //     this.showNotFoundTextDelete = true;
  //   });
  // }


}


