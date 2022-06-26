import { DatePipe } from '@angular/common';
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
  isOwner:  boolean = false;
  userId: number = 0;
  deadline: string | null = null;

  @Input()
    set setUserId(id: number){
      this.userId = id;
      this.isOwner = Number(this.lot?.ownerId) === Number(this.userId);
    }
    
  @Input()
    set setLot(lot: Lot){
      this.lot = lot; 
      const pipe = new DatePipe('en-US');
      this.deadline = pipe.transform(this.lot.deadline,'dd.MM.yyyy hh:mm:ss');
    }

  constructor() {   }

  ngOnInit(): void {  }

  // onClickEdit(){
  //   this.router.navigate([`/lot/edit/${this.lot?.id}`])
  // }
}
