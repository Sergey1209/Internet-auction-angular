import { Component, Input, OnInit } from '@angular/core';
import { Lot } from 'src/app/models/lot';
import { UserToken } from 'src/app/models/user-token';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.component.html',
  styleUrls: ['./lot-list.component.css']
})
export class LotsListComponent implements OnInit {
  baseLots: Lot[] = [];
  lots: Lot[] | null = null;
  searchString: string = '';
  lotCategoryId:number = 0;
  sliceLots: number = 20;

  @Input()
    set setLotCategoryId(id: number){  
      this.lotCategoryId = id; 
      this.filterLots();
    }
 
  @Input()
    set setSearch(val: string){
      this.searchString = val.trim();
      this.filterLots();
    }

  constructor(
    private lotService: LotService, 
    public userToken: UserToken) { 
  }

  ngOnInit(): void { 
    this.lotService.getAllLots().subscribe(data => {
      this.baseLots = data.sort((a,b) => <any>new Date(b.initialDate) - <any>new Date(a.initialDate));
      this.filterLots();
    });
  }

  filterLots(){
    this.lots = this.baseLots.slice(0, this.sliceLots);
    this.filterByCategory();
    this.filterBySearchString();
  }

  filterByCategory(){
    if (this.lotCategoryId > 0){
      this.lots = this.baseLots?.filter(x => x.categoryId === this.lotCategoryId); 
    }
  }

  filterBySearchString(){
    if (this.searchString){
      this.lots = this.baseLots?.filter(x => x.name.includes(this.searchString.trim())); 
    }
  }

  getMaxLotId() {
    this.baseLots[0]
  }

}
