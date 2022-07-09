import { Component, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category-lot';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedCategory: Category | null = null;

  constructor( ) { }

  handleSelectedCategory(selectedCategory: Category | null ){
    this.selectedCategory = selectedCategory;   
  }
}
