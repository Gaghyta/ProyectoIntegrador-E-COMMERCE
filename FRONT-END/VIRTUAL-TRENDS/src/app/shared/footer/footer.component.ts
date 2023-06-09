import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  anio: number = new Date().getFullYear();

  email: string = '';

  constructor(private http: HttpClient) {}

  submitNewsletter() {
    // Realiza la solicitud HTTP para guardar el correo electrónico
    this.http.post('/newsletter/', { email: this.email })
      .subscribe(
        response => {
          console.log('Correo electrónico enviado correctamente');
        },
        error => {
          console.error('Error al enviar el correo electrónico', error);
        }
      );
  }

  ngOnInit(){

  }
  
}
