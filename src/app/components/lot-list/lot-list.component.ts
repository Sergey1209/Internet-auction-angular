import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  lotsAmount: number = 20;
  minId: number = 0;

  @Input()
    set setLotCategoryId(id: number){  
      this.lotCategoryId = id; 
      this.filterLots();
    }

  loadLots(){
    this.lotService.getAllLots(this.minId).subscribe(data => {
      this.baseLots.push(...data);
      this.baseLots = this.baseLots.sort((a,b) => b.id - a.id);
      this.filterLots();
      const arr = this.baseLots?.map(x => x.id);
      this.minId = Math.min(...arr);
    });
  }
 
  @Input()
    set setSearch(val: string){
      this.searchString = val.trim();
    }

  constructor(
    private lotService: LotService, 
    public userToken: UserToken,
    private router: Router) { 
  }

  ngOnInit(): void { 
    this.loadLots();
  }

  filterLots(){
    this.lots = this.baseLots;//.slice(0, this.sliceLots);
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
      this.lots = this.baseLots?.filter(x => x.name.includes(this.searchString)); 
    }
  }

  getMaxLotId() {
    this.baseLots[0]
  }

  onKeyPressSearch(event: KeyboardEvent){
    // if (event.key === 'Enter') {
      this.filterLots();
    // }
  }

  addLot(){
    this.router.navigate(['/lot/add']);
  }

}
