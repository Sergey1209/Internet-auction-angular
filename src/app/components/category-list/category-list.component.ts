import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { UserToken } from 'src/app/models/user-token';
import { CategoryService } from 'src/app/services/category.service';
import { ProxyService } from 'src/app/services/proxy.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryid = 0;
  
  constructor(
    private categoryService: CategoryService,
    public userToken: UserToken,
    private router: Router,
    private proxyService: ProxyService
    ) {
      proxyService.onSelectCategory.subscribe(x => {this.selectedCategoryid = x.id} );
    }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categ => {
      this.categories = categ;
      this.categories.push(new Category(0, 'All', ''));
      this.categories.sort((a,b) => a.id - b.id);
    }); 
  }

  addCategory(){
    this.router.navigate(['/lotcategory/add']);
  }
  editCategory(){
    this.router.navigate([`/lotcategory/${this.selectedCategoryid}`]);
  }
}
