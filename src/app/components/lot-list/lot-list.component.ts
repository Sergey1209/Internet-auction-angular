import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Lot } from 'src/app/models/lot';
import { ACCESS_TOKEN_KEY } from 'src/app/services/auth.service';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.component.html',
  styleUrls: ['./lot-list.component.css']
})
export class LotsListComponent implements OnInit {
  lots: Lot[] | null = null;
  userId: number= 0;

  @Input()
    set lotCategoryId(id: Number){   
      this.fillLotList(id);
    }

  constructor(private lotService: LotService, private jwthelper: JwtHelperService, ) { 
  }

  ngOnInit(): void { 
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    this.userId = token ? this.jwthelper.decodeToken(token).sub : 0;
  }

  fillLotList(categoryId:Number){
    this.lotService.getlotsByCategory(categoryId).subscribe(data => this.lots = data);
  }

}
