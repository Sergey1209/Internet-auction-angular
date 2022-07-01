import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedLotCategoryid = 0;

  constructor( ) { }

  handleSelectedCategory(categoryid: number){
    this.selectedLotCategoryid = categoryid;
  }

}
