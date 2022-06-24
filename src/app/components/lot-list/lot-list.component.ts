import { Component, Input, OnInit } from '@angular/core';
import { Lot } from 'src/app/models/lot';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.component.html',
  styleUrls: ['./lot-list.component.css']
})
export class LotsListComponent implements OnInit {
  lots: Lot[] | null = null;

  @Input()
    set lotCategoryId(id: Number){   
      this.fillLotList(id);
    }

  constructor(private lotService: LotService) { }

  ngOnInit(): void {  }

  fillLotList(categoryId:Number){
    this.lotService.getlotsByCategory(categoryId).subscribe(data => this.lots = data);
  }

}
