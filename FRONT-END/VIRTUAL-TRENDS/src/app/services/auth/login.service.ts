import { Injectable } from '@angular/core';
import { LoginRequest } from './loginrequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { UserData } from './userdata';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('userLoginOn') as string));
  currentUserData: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('credentials') as string));
  constructor(private http: HttpClient, private navigationService: NavigationService) {

  }

  login(credentials:LoginRequest): Observable<UserData>{
    return  this.http.post<UserData>('http://127.0.0.1:8000/api/valid/', credentials).pipe(
      tap((userData: UserData)  => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true); 
        // Guardar las credenciales en el localStorage
        localStorage.setItem('credentials', JSON.stringify(userData));
        localStorage.setItem('userLoginOn', JSON.stringify(true));
      }),
      catchError(this.handleError)
    )
  }

  logout(){
    this.currentUserLoginOn.next(false);
    localStorage.removeItem('credentials');
    localStorage.removeItem('userLoginOn');
    this.navigationService.navigateToHome();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error("Se a producido un error" + error.error);
    }
    else{
      console.error("Error en backend: "+ error.status + error.error);
    }
    return throwError(()=> new Error("Usuario y/o contraseña incorrectos."))
  }

  get userData(): Observable<UserData>{
     return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
