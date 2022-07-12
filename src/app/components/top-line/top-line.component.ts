import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-line',
  templateUrl: './top-line.component.html',
  styleUrls: ['./top-line.component.css']
})
export class TopLineComponent  {

  constructor(private router: Router) { }

  onClickLogin(){
    this.router.navigate(['/login']);
  }
}
