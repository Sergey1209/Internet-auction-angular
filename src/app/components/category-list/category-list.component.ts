import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Lot } from 'src/app/models/lot';
import { UserToken } from 'src/app/models/user-token';
import { CategoryService } from 'src/app/services/category.service';
import { ProxyService } from 'src/app/services/proxy.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  selectedCategoryid = 0;
  subscription: Subscription = new Subscription();
  private static thisComponent: CategoriesListComponent| undefined;
  lot: Lot | null = null;
  
  constructor(
    private categoryService: CategoryService,
    public userToken: UserToken,
    private router: Router,
    private proxyService: ProxyService
    ) {
        if(CategoriesListComponent.thisComponent){
          return CategoriesListComponent.thisComponent;
        }
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    CategoriesListComponent.thisComponent = this;
  }

  updateLot(newLot: Lot){
    for(let c=0; c < this.categories.length; c++){
      const count = this?.categories[c]?.lots?.length;
      if (count){
        for(let l=0; l < count; l++){
          let lots = this.categories[c].lots;
          if (lots && newLot.id === lots[l]?.id){
            lots[l] = newLot;
          }
        }
      }
    }
  }

  updateCategory(newCategory: Category){
    let categ = this.categories.find(x => x.id === newCategory.id);
    if (categ){
      categ.name = newCategory.name;
    }
  }

  private removeLot(lotId: number){
    for(let c=0; c < this.categories.length; c++){
      const count = this?.categories[c]?.lots?.length;
      if (count){
        let lots = this.categories[c].lots;
        for(let l=0; l < count; l++){
          if (lots && lotId === lots[l]?.id){
            delete lots[l];
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.subscription.add(this.proxyService.lotData.subscribe(lot => this.updateLot(lot)));
    this.subscription.add(this.proxyService.onDeleteLot.subscribe(lotId => this.removeLot(lotId)));
    this.subscription.add(this.proxyService.categoryData$.subscribe(categ => this.updateCategory(categ)));

    if(!CategoriesListComponent.thisComponent){
      this.subscription.add(this.categoryService.getCategories().subscribe(categ => {
        categ.push(new Category(0, 'All', ''));
        categ.forEach(x => {
          const n = new Category(x.id, x.name, x.urlIcon);
          n.visible = true;
          n.isSelected = false;
          this.categories.push(n);
        })
        this.categories.sort((a,b) => a.id - b.id);
        this.emitCurrentCategory();
      }));
 
      this.subscription.add(this.proxyService.onSelectCategory.subscribe(x => this.selectedCategoryid = x.id)); 
    }
    else{
      this.emitCurrentCategory();
    }
  }

  emitCurrentCategory(){
    this.proxyService.onSelectCategory.emit(
      this.categories.find(x => x.id === this.selectedCategoryid));
  }

  addCategory(){
    this.router.navigate(['/lotcategory/add']);
  }
  editCategory(){
    this.router.navigate([`/lotcategory/${this.selectedCategoryid}`]);
  }
}
