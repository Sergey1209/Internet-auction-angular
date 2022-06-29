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

  @Input()
    set lotCategoryId(id: Number){   
      this.fillLotList(id);
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
  }

  fillLotList(categoryId:Number){
    this.lotService.getlotsByCategory(categoryId).subscribe(data => {
      this.baseLots = data;
      this.filterLots();
    });
    
  }

  filterLots(){
    if (this.searchString){
      this.lots = this.baseLots?.filter(x => x.name.includes(this.searchString.trim())); 
    }
    else{
      this.lots = this.baseLots;
    }
  }

}
