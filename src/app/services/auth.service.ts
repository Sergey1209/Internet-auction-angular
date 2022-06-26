import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AUTH_API_URL } from '../app.injection-tokens';
import { Observable, tap } from 'rxjs';
import { Token } from '../models/token';

export const ACCESS_TOKEN_KEY = 'auction_access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = `${this.apiUrl}api/auth`;

  constructor(
    private httpClient: HttpClient, 
    private jwthelper: JwtHelperService, 
    @Inject(AUTH_API_URL) private apiUrl: string
    ) {  }

  login(email: string, pass: string) : Observable<Token> {
    const body = {email: email, password: pass};
    const url = `${this.baseApiUrl}/login`;
    
    return this.httpClient.post<Token>(url, body)
      .pipe(tap(token => this.saveToken(token)));
  }

  register(email: string, pass: string, nickname: string) : Observable<Token> {
    const body = {email: email, password: pass, nickname: nickname};
    const url = `${this.baseApiUrl}/registration`;
    
    return this.httpClient.post<Token>(url, body)
      .pipe(tap(token => this.saveToken(token)));
  }

  private saveToken(token: Token){
    localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
  }

  public isAuthenticated() : boolean{
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token ? !this.jwthelper.isTokenExpired(token) : false;
  }

  logout(){
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
