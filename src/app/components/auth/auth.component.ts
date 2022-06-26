import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription, pipe, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private subscription = new Subscription();
  loginVisible = true;
  regVisible = false;

  form: FormGroup;
  
  constructor(private router: Router, private authService: AuthService) { 
    this.form = new FormGroup({
      'nickname': new FormControl('nickname', Validators.compose([Validators.required, Validators.minLength(2)])),
      'email' : new FormControl('mail12@gmail.com',  Validators.compose([Validators.required, Validators.email])),
      'pass' : new FormControl('pass2', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {  
  }

  login(){
    const login = this.form.get('email')?.value;
    const pass = this.form.get('pass')?.value;

    if (this.form.get('email')?.valid && this.form.get('pass')?.valid)
      this.subscription.add(this.authService.login(login, pass).pipe(tap(x => this.toMain())).subscribe());
  }

  registration(){
    const login = this.form.get('email')?.value;  
    const pass = this.form.get('pass')?.value;
    const nickname = this.form.get('nickname')?.value;

    if (this.form.valid)
      this.subscription.add(this.authService.register(login, pass, nickname).pipe(tap(x => this.toMain())).subscribe());
  }

  toMain(){  
    if (this.isLogin){
      this.subscription.unsubscribe();
      this.router.navigate(['']);
    }
  }

  toggleButton(){
    this.regVisible = !this.regVisible;
    this.loginVisible = !this.loginVisible;
  }

  logout() {
    this.authService.logout();
  }

  public get isLogin(): boolean {
    return this.authService.isAuthenticated();
  }

}
