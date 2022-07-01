import { HttpClient } from '@angular/common/http';
import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/user-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: Router,
    public userToken: UserToken) {
      this.selectedLotCategoryid = 0;
    }
  
  selectedLotCategoryid;
  searchString: string = '';
  searchStringEmit: string = '';

  ngOnInit(): void {
  }

  addLotCategory(){
    this.route.navigate(['/lotcategory/add']);
  }

  editLotCategory(){
    this.route.navigate([`/lotcategory/${this.selectedLotCategoryid}`]);
  }

  addLot(){
    this.route.navigate(['/lot/add']);
  }

  handleSelectedCategory(categoryid: number){
    this.selectedLotCategoryid = categoryid;
  }

  onKeyPressSearch(event: KeyboardEvent){
    if (event.key === 'Enter') {
      this.searchStringEmit = this.searchString;
    }
  }

}
