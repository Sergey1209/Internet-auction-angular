import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ProxyService } from 'src/app/services/proxy.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent { 
  category: Category | null = null;
  
  @Input()
  set setCategory(category: Category){
    this.category = new Category(category.id, category.name, category.urlIcon);
    
    this.category.visible = category.visible === undefined ? true : category.visible;
    this.category.isSelected = category.isSelected === undefined ? false : category.isSelected;

    if(category.id === 0){
      this.proxyService.onSelectCategory.emit(this.category);
    }
  }

  constructor(
    private proxyService: ProxyService
    ) { }

  handleSelectedCategory(){
    if (this.category){
      this.proxyService.onSelectCategory.emit(this.category);
    }
  }

}