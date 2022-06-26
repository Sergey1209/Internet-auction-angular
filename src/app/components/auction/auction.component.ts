import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot';
import { ACCESS_TOKEN_KEY } from 'src/app/services/auth.service';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  lot: Lot = new Lot(0, '', '', 0, [], new Date(Date.now()), 0, '', 0);
  subscription = new Subscription();
  isOwner:  boolean = false;
  deadline: string | null = null;
  betValue: number = 0;

  get bet(){
    return this.betValue;
  }
  set bet(val: number){
    if (val > 1){
      var roundVal = Number.parseInt(val.toString()) + 1;
      this.betValue = roundVal;
    }
  }

  get betIsTrue(){
    return this.betValue > this.lot.initialPrice;
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private lotService:LotService,
    private jwthelper: JwtHelperService,
    private router: Router) {

    const id = this.activeRoute.snapshot.paramMap.get('id'); 
    if (id != null && id != '0' && id != ''){  
      this.subscription.add(this.lotService.getLotById(id).subscribe(lot => {
        this.lot = lot;
        this.setData();
        this.betValue = lot.initialPrice + 1;
      }));
    }
  }

  ngOnInit(): void {
  }

  private setData(){
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const userId = token ? this.jwthelper.decodeToken(token).sub : 0;
    this.isOwner = Number(this.lot?.ownerId) === Number(userId);

    const datePipe = new DatePipe('en-US');
    this.deadline = datePipe.transform(this.lot.deadline,'dd.MM.yyyy hh:mm:ss');
  }

  onClickEdit(){
    this.router.navigate([`/lot/edit/${this.lot?.id}`])
  }

  onBet(){
    
  }
  

}
