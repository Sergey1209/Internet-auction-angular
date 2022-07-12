import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, tap, catchError, throwError } from 'rxjs';
import { UserToken } from 'src/app/models/user-token';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  private subscription = new Subscription();
  loginVisible = true;
  regVisible = false;

  form: FormGroup;
  
  constructor(
    private router: Router, 
    private authService: AuthService,
    private userToken: UserToken) { 
    
      this.form = new FormGroup({
      'nickname': new FormControl('nickname', Validators.compose([Validators.required, Validators.minLength(2)])),
      'email' : new FormControl('user1@auction.com',  Validators.compose([Validators.required, Validators.email])),
      'pass' : new FormControl('1', [Validators.required, Validators.minLength(1)])
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(){
    const login = this.form.get('email')?.value;
    const pass = this.form.get('pass')?.value;

    if (this.form.get('email')?.valid && this.form.get('pass')?.valid)
      this.subscription.add(this.authService
        .login(login, pass)
        .pipe(catchError(err => {
          this.hasError = true;
          return throwError(err);
        }))
        .pipe(tap(x => {
          this.toHome();
          this.hasError = false;
        }))
        .subscribe());
  }

  hasError = false;

  registration(){
    const login = this.form.get('email')?.value;  
    const pass = this.form.get('pass')?.value;
    const nickname = this.form.get('nickname')?.value;

    if (this.form.valid)
      this.subscription.add(this.authService.register(login, pass, nickname).pipe(tap(x => this.toHome())).subscribe());
  }

  toHome(){  
    if (this.isLogin){
      this.router.navigate(['/home']);
    }
  }

  toggleButton(){
    this.regVisible = !this.regVisible;
    this.loginVisible = !this.loginVisible;
  }

  logout() {
    this.authService.logout();
  }

  get isLogin(): boolean {
    return this.userToken.isAuthenticated;
  }

  home(){
    this.router.navigate(['/home']);
  }
}
