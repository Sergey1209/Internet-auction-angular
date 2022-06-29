import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ACCESS_TOKEN_KEY } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserToken {
  private token: string | null = null;

  constructor(private jwthelper: JwtHelperService) {  }

  get userId() : number{
    this.updateToken(); 
    return this.token ? this.jwthelper.decodeToken(this.token).sub : 0;
  };

  get userRole() : string{
    this.updateToken(); 
    return this.token ? this.jwthelper.decodeToken(this.token).role : 'unregistered';
  };

  get isAdmin() : boolean{
    this.updateToken();
    return this.userRole.toLowerCase() == 'administrator';
  };
  
  get isAuthenticated() : boolean{
    this.updateToken();
    return this.token ? !this.jwthelper.isTokenExpired(this.token) : false;
  }

  private updateToken(){
    this.token = localStorage.getItem(ACCESS_TOKEN_KEY);
  }
}
