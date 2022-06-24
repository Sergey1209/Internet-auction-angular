import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryLot } from 'src/app/models/category-lot';

@Component({
  selector: 'app-category-lot',
  templateUrl: './category-lot.component.html',
  styleUrls: ['./category-lot.component.css']
})
export class LotCategoryComponent implements OnInit { 
  @Input()
    lotCategory: CategoryLot = new CategoryLot(0, '', '');

  @Output()
    onSelectedCategory = new EventEmitter<number>();

  constructor() {
   }

  ngOnInit(): void { }

  loadLotsOfCategory(){
    this.onSelectedCategory.emit(this.lotCategory?.id);
  }
}
