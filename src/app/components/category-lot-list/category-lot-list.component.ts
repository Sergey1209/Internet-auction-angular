import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryLot } from 'src/app/models/category-lot';
import { UserToken } from 'src/app/models/user-token';
import { CategoryLotService } from 'src/app/services/category-lot.service';

@Component({
  selector: 'app-categories-lot-list',
  templateUrl: './category-lot-list.component.html',
  styleUrls: ['./category-lot-list.component.css']
})
export class LotCategoriesListComponent implements OnInit {
  lotCategories: CategoryLot[] = [];

  @Output()
    onSelectedCategory = new EventEmitter<number>();

  selectedLotCategoryid = 0;
  
  constructor(
    private lotCategoryService: CategoryLotService,
    public userToken: UserToken,
    private router: Router) { 
    }

  ngOnInit(): void {
    this.lotCategoryService.getLotCategories().subscribe(categ => {
      this.lotCategories = categ;
    }); 
  }

  handleSelectedCategory(id: number){
    this.selectedLotCategoryid = id;
    this.onSelectedCategory.emit(id);
  }

  addLotCategory(){
    this.router.navigate(['/lotcategory/add']);
  }
  editLotCategory(){
    this.router.navigate([`/lotcategory/${this.selectedLotCategoryid}`]);
  }
}
