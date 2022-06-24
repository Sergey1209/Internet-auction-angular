import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-line',
  templateUrl: './top-line.component.html',
  styleUrls: ['./top-line.component.css']
})
export class TopLineComponent  {

  
  constructor(private route: Router) { }

  onClickLogin(){
    this.route.navigate(['/auth']);
  }
}
