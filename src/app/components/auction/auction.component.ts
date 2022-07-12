import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { auction } from 'src/app/models/auction';
import { UserToken } from 'src/app/models/user-token';
import { AuctionService } from 'src/app/services/auction.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {
  auction = new auction(0, 0, '', 0, new Date(Date.now()), '', '',[]);
  subscription = new Subscription();
  isOwner:  boolean = false;
  isAdmin:  boolean = false;
  deadline: string | null = null;
  betValue: number = 0;
  id: number = 0;

  get bet(){
    return this.betValue;
  }

  set bet(val: number){
    if (val > 1){
      var roundVal = Number.isInteger(val) ? val : Number.parseInt(val.toString()) + 1;
      this.betValue = roundVal;
    }
  }

  get betIsTrue(){
    return this.betValue > this.auction.betValue;
  }

  constructor(
        private activeRoute: ActivatedRoute,
        private auctionService:AuctionService,
        private router: Router,
        private userToken: UserToken) {

    const id = this.activeRoute.snapshot.paramMap.get('id') ?? ''; 
    if(id || Number.isInteger(id)){
      this.id = Number(id);
      this.loadAuction();
    }
    else {
      this.router.navigate(['/home']);
      return;
    }     
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  private isAuthenticated(){
    if (!this.userToken.isAuthenticated){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private loadAuction(){
    if (this.isAuthenticated()) {
      this.subscription.add(this.auctionService.getAuctionById(this.id).subscribe(auction => {
        this.auction = auction;
        this.setData();
      }));
    }
  }

  private setData(){
    this.isOwner = Number(this.auction?.ownerId) === Number(this.userToken.userId);
    this.isAdmin = this.userToken.isAdmin;
    const datePipe = new DatePipe('en-US');
    this.deadline = datePipe.transform(this.auction.deadline,'dd.MM.yyyy hh:mm:ss');
  }

  isEnabledAuction() {
     return this.isAuthenticated() && Date.parse(this.auction.deadline.toString()) > Date.parse(new Date(Date.now()).toString())
  }

  onClickEdit(){
    if (this.isAuthenticated()){
      this.router.navigate([`/lot/${this.auction.lotId}`])
    }
  }

  onBet(){
    if (this.isAuthenticated()){
      if (this.isEnabledAuction() && this.betIsTrue){
        this.auctionService.setBet(this.id, this.betValue).subscribe(x => this.updateBet());
      }  
    }
  }

  updateBet(){
    if (this.isAuthenticated()){    
      this.subscription.add(this.auctionService.getLastBetValue(this.id).subscribe(res => {
        this.auction.betValue = res.betValue;
        this.auction.customerNickname = res.customerNickname;
      }));
    }
  }
  
}
