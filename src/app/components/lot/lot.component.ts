import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Lot } from 'src/app/models/lot';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.css']
})
export class LotComponent implements OnInit {
  @Output()
    currentImgIndex = 0;
  
  lot: Lot | null = null;
  
  @Input()
    set setLot(lot: Lot){
      this.lot = lot; 
    }

  constructor(private route: Router) {   }

  ngOnInit(): void {  }

  onClickEdit(){
    this.route.navigate([`/lot/edit/${this.lot?.id}`])
  }
}
