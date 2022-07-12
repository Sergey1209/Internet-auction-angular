// taken from https://medium.com/@coolsharang/angular-combo-box-840c893a253c

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent implements OnInit, OnDestroy {
  list: Category[] = [];
  filteredList: Category[] = [];
  inputItem: string = '';
  listHidden = true;
  selectedIndex = -1;
  subscription = new Subscription();

  constructor(private categoryService: CategoryService) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(this.categoryService.getCategories().subscribe(listCateg => {
      this.list = listCateg;
      this.filteredList = this.list;
      const index =  this.filteredList.findIndex(x => x.id === this.categoryId);
      this.selectItem(index);
    }));
  }

  @Input()
    categoryId: number = 0;

  @Output()
    onSelectedCategory = new EventEmitter<number>();

  getFilteredList() {   
    this.listHidden = false;
    const filterString = this.inputItem.toLowerCase();
    if (filterString){
      if (!this.listHidden && this.inputItem) {
        this.filteredList = this.list.filter((item) =>  item.name.toLowerCase().includes(filterString));
      } 
    }
    else{
      this.filteredList = this.list;
    }
  }
  selectItem(ind: number) {
    if (ind < 0)
      return;

    this.onSelectedCategory.emit(this.filteredList[ind].id);
    this.inputItem = this.filteredList[ind].name;
    this.listHidden = true;
    this.selectedIndex = ind;
  }

  onKeyPress(event: KeyboardEvent) {
    if (!this.listHidden) { 
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }else if (event.key === 'Enter') {
          this.toggleListDisplay(0);
      }else if (event.key === 'ArrowDown') {
        this.listHidden = false;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
            document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
        
      } else if (event.key === 'ArrowUp') {
        this.listHidden = false;
        if (this.selectedIndex <= 0) {
            this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  toggleListDisplay(sender: number) {
    if (sender === 1) {
      this.listHidden = false;
    } else {
      setTimeout(() => {
          this.selectItem(this.selectedIndex);
          this.listHidden = true;
          this.filteredList = this.list;
      }, 100);
    }
  }

}
