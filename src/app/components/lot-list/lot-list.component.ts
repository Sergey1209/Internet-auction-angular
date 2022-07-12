import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Lot } from 'src/app/models/lot';
import { UserToken } from 'src/app/models/user-token';
import { LotService } from 'src/app/services/lot.service';
import { ProxyService } from 'src/app/services/proxy.service';

enum TypeLots{
  byCategory,
  bySearch
}
@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.component.html',
  styleUrls: ['./lot-list.component.css']
})
export class LotsListComponent implements OnDestroy{
  currentCategory: Category | null = null;
  lots: Lot[] | null = null;
  searchString: string = '';
  oldSearchString: string = '';
  typeLots : TypeLots | null = null;
  searchCategory: Category = new Category(-1,'Search','');
  subscription: Subscription = new Subscription();
  lot: Lot | undefined;


  @Input()
  set setSearch(val: string){
    this.searchString = val.trim();
  }

  @Input()
    set setCategory(activeCategory: Category | null){ 
      this.loadLotsBySelectedCategory(activeCategory);
    }

  constructor(
    public userToken: UserToken,
    private router: Router,
    private lotService: LotService,
    public proxyService: ProxyService
    ) { 
      this.subscription.add(this.proxyService.onSelectCategory.subscribe(
        x => this.setCategory = x));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  unselectCurrentCategory(){
    if (this.currentCategory){
      this.currentCategory.isSelected = false;
    }
  }
  
  private setCurrentCategory(category: Category | null){
    this.currentCategory = category;
    if (this.currentCategory){
      this.lots = this.currentCategory.lots;
      this.currentCategory.isSelected = true;
    }
    else{
      this.lots = null;
    }
  }

  loadLotsBySelectedCategory(activeCategory: Category | null){
    if (this.currentCategory === activeCategory){
      this.currentCategory?.togleSelect();
      return;
    }

    this.unselectCurrentCategory();
    this.typeLots = TypeLots.byCategory;
    this.setCurrentCategory(activeCategory);

    if (this.currentCategory && !this.currentCategory.lots){
      this.loadLots();
    }
  }

  loadLotsBySearchstring() {
    if (this.oldSearchString === this.searchString){
      if (this.currentCategory !== this.searchCategory){
        this.unselectCurrentCategory();
        this.setCurrentCategory(this.searchCategory);
      }
      return;
    }

    if (this.searchCategory){
      this.searchCategory.lots = null;
    }
    this.unselectCurrentCategory();
    this.setCurrentCategory(this.searchCategory);
    this.typeLots = TypeLots.bySearch
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

  private getMinId(){
    const arr = this.lots?.filter(x => x !== undefined).map(x => x.id);
    const minId = arr?.length! > 0 ? Math.min(...arr!) : 0;
    return minId;
  }

  private getFuncLotsByCategory(){
    const minId = this.getMinId();
    return this.currentCategory ? this.lotService.getlotsByCategory(this.currentCategory.id, minId) : null;
  }

  private getFuncLotsBySearch(){
    const minId = this.getMinId();
    return this.currentCategory ? this.lotService.getlotsBySearch(this.searchString, minId) : null;
  }

  private getCurrentFuncLots() : any{
    if (this.typeLots === TypeLots.byCategory){
      return this.getFuncLotsByCategory();
    }
    else if(this.typeLots === TypeLots.bySearch){
      return this.getFuncLotsBySearch();
    }
    else{
      return null;
    }
  }

  loadLots() {
    let func: any = this.getCurrentFuncLots();
    if (func){
      func.subscribe((data: Lot[] | null) => {
        if (data){
          if (this.currentCategory?.lots?.filter(x => x !== undefined).find(x => x.id < this.getMinId())){
            return;
          }

          if (this.currentCategory?.lots){
            this.currentCategory.lots.push(...data);
          }
          else {
            if (this.currentCategory){
              this.currentCategory.lots = data;
              this.lots = this.currentCategory?.lots;
            }
          }
        }
      });
    }
  }

  onKeyPressSearch(event: KeyboardEvent){
    if (event.key === 'Enter') {
      this.loadLotsBySearchstring();
      this.oldSearchString = this.searchString;
    }
  }

  addLot(){
    this.router.navigate(['/lot/add']);
  }

}
