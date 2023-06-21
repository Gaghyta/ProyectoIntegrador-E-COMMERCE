import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { NavigationService } from "src/app/services/navigation/navigation.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private navigationService: NavigationService) {}
  canActivate(): boolean {
    let data = JSON.parse(localStorage.getItem("credentials") as string);
    // Se considera que el usuario es administrador si su id_lvl es 1
    if (data?.id_lvl === 1) {
      return true;
    }
    else {
      this.navigationService.navigateToErrorPage();
      return false;
    }
  }
}
