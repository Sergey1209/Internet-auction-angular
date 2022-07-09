import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category-lot';
import { UserToken } from 'src/app/models/user-token';
import { CategoryLotService as CategoryService } from 'src/app/services/category-lot.service';

@Component({
  selector: 'app-categories-lot-list',
  templateUrl: './category-lot-list.component.html',
  styleUrls: ['./category-lot-list.component.css']
})
export class LotCategoriesListComponent implements OnInit {
  
  categoryAll: Category = new Category(0, 'All', '')

  @Output()
    onSelectedCategory = new EventEmitter<Category | null>();

  @Output()
    categories: Category[] = [];
  
  selectedCategoryid = 0;
  
  constructor(
    private categoryService: CategoryService,
    public userToken: UserToken,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categ => {
      this.categories = categ;
      this.categories.push(this.categoryAll);
      this.categories.sort((a,b) => a.id - b.id);
    }); 
  }

  handleSelectedCategory(category: Category | null){
    category?.togleSelect();
    this.selectedCategoryid = category ? category.id : 0;
    this.onSelectedCategory.emit(category);

    // if (!category?.isSelected){
    //   this.selectedCategoryid = category ? category.id : 0;
    //   this.onSelectedCategory.emit(category);
    // }
    // else{
    //   category.togleSelect();
    //   // this.selectedCategoryid = 0;
    //   // this.onSelectedCategory.emit(this.categoryAll);
    // }
  }

  addCategory(){
    this.router.navigate(['/lotcategory/add']);
  }
  editCategory(){
    this.router.navigate([`/lotcategory/${this.selectedCategoryid}`]);
  }
}
