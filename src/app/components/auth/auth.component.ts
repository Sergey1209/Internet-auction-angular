import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  loginVisible = true;
  regVisible = false;


  form: FormGroup;
  
  constructor(private router: Router, private authService: AuthService) { 
    this.form = new FormGroup({
      'nickname': new FormControl(this.nickname, Validators.compose([Validators.required, Validators.minLength(2)])),
      'email' : new FormControl('',  Validators.compose([Validators.required, Validators.email])),
      'pass' : new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {  
  }

  login(){
    alert('valid='+this.form.valid);
    const login = this.form.get('email')?.value;
    const pass = this.form.get('pass')?.value;

    if (this.form.get('email')?.valid && this.form.get('pass')?.valid)
      this.authService.login(login, pass);
  }

  registration(){
    const login = this.form.get('email')?.value;  
    const pass = this.form.get('pass')?.value;
    const nickname = this.form.get('nickname')?.value;

    if (this.form.valid)
      this.authService.register(login, pass, nickname);
  }

  toMain(){
    this.router.navigate(['']);
  }

  toggleButton(){
    this.regVisible = !this.regVisible;
    this.loginVisible = !this.loginVisible;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
  }

  get nickname():string | null{
    return localStorage.getItem('nickname');
  }

  public get isLogin(): boolean {
    return (localStorage.getItem('token') !== null);
  }

}
