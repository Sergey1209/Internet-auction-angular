import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryLot } from 'src/app/models/category-lot';
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

  constructor(private lotCategoryService: CategoryLotService) { }

  ngOnInit(): void {
    this.lotCategoryService.getLotCategories().subscribe(categ => {
      this.lotCategories = categ;
    }); 
  }

  handleSelectedCategory(id: number){
    this.onSelectedCategory.emit(id);
  }

}
