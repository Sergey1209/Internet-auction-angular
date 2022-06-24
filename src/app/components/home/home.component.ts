import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) {  }
  
  selectedLotCategoryid: Number = 0;

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

}
