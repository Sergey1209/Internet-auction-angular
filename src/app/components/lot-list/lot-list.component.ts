import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category-lot';
import { Lot } from 'src/app/models/lot';
import { UserToken } from 'src/app/models/user-token';
import { LotService } from 'src/app/services/lot.service';

enum TypeLots{
  byCategory,
  bySearch
}
@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.component.html',
  styleUrls: ['./lot-list.component.css']
})
export class LotsListComponent {
  activeCategory: Category | null = null;
  baseLots: Lot[] | null = null;
  lots: Lot[] | null = null;
  searchString: string = '';
  typeLots : TypeLots | null = null;

  @Input()
  set setSearch(val: string){
    this.searchString = val.trim();
  }

  @Input()
  set setActiveCategory(activeCategory: Category | null){ 
    if (this.activeCategory){
      this.activeCategory.togleSelect ();
    }

    this.typeLots = TypeLots.byCategory;
    this.activeCategory = activeCategory; 
    this.baseLots = null;
    this.filterLots();

    if (activeCategory){
      if (!activeCategory.lots) {
        this.loadLots();
      }
      else{
        this.baseLots = activeCategory.lots;
        this.filterLots();
      }
    }
    // activeCategory?.togleSelect ();
  }

  constructor(
    public userToken: UserToken,
    private router: Router,
    private lotService: LotService) { 
  }

  loadLotsBySearchstring() {
    if (this.activeCategory){
      this.activeCategory.isSelected = false;
    }

    this.typeLots = TypeLots.bySearch
    this.activeCategory = new Category(0, 'search', '');
    this.baseLots = null;
    this.filterLots();
    this.loadLots();
  }

  handleInfinityScrollLots(){
    this.loadLots();
  }

  handleMousewheel(){
    const scrollContainer = document.getElementById('lot-list-scroll');
    if (scrollContainer){
      if (scrollContainer.clientHeight == scrollContainer.scrollHeight){
        this.loadLots();
      }
    }  
  }

  private getFuncLotsByCategory(){
    const minId = this.getMinId();
    return this.activeCategory ? this.lotService.getlotsByCategory(this.activeCategory.id, minId) : null;
  }

  private getFuncLotsBySearch(){
    const minId = this.getMinId();
    return this.activeCategory ? this.lotService.getlotsBySearch(this.searchString, minId) : null;
  }

  private getMinId(){
    const arr = this.baseLots?.map(x => x.id);
    const minId = arr?.length! > 0 ? Math.min(...arr!) : 0;
    return minId;
  }

  loadLots() {
    let func: any;
    if (this.typeLots === TypeLots.byCategory){
      func = this.getFuncLotsByCategory();
    }
    else if(this.typeLots === TypeLots.bySearch){
      func = this.getFuncLotsBySearch();
    }

    func.subscribe((data: Lot[] | null) => {
      if (data){
        if (this.activeCategory?.lots?.find(x => x.id < this.getMinId())){
          return;
        }
        if (this.activeCategory?.lots){
          this.activeCategory.lots.push(...data);
        }
        else {
          if (this.activeCategory){
            this.activeCategory.lots = data;
            this.baseLots = this.activeCategory?.lots;
          }
        }
        this.filterLots();
      }
    });
  }

  filterLots(){
    this.lots = this.baseLots;
  }

  onKeyPressSearch(event: KeyboardEvent){
    if (event.key === 'Enter') {
      this.loadLotsBySearchstring();
    }
  }

  addLot(){
    this.router.navigate(['/lot/add']);
  }

}
