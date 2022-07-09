import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { Category } from 'src/app/models/category-lot';
@Component({
  selector: 'app-category-lot',
  templateUrl: './category-lot.component.html',
  styleUrls: ['./category-lot.component.css']
})
export class CategoryLotsComponent { 
  category: Category | null = null;
  
  @Input()
    set setCategory(category: Category){
      this.category = new Category(category.id, category.name, category.urlIcon);
    }
    
  @Output()
    onSelectedCategory = new EventEmitter<Category | null>();

  constructor() {  }

  handleSelectedCategory(){
    if (this.category){
      this.onSelectedCategory.emit(this.category);
    }
  }

}