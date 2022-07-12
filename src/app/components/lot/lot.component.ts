import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot';
import { UserToken } from 'src/app/models/user-token';
import { LotService } from 'src/app/services/lot.service';
import { ProxyService } from 'src/app/services/proxy.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.css']
})
export class LotComponent implements OnInit, OnDestroy {
  constructor(
    private lotService: LotService,
    private router: Router,
    private userToken: UserToken,
    private proxyService: ProxyService) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {  }

  @Output()
    currentImgIndex = 0;

  isValidAuction: boolean = false;
  
  lot: Lot | null = null;
  urlImage0: string = '';
  isOwner:  boolean = false;
  isAdmin:  boolean = false;
  deadline: string | null = null;
  added: string | null = null;
  subscription = new Subscription();

  @Input()
    set setLot(lot: Lot){
      this.lot = lot; 
      this.urlImage0 = lot.images[0];
      const pipe = new DatePipe('en-US');
      this.deadline = pipe.transform(this.lot.deadline,'dd.MM.yyyy hh:mm:ss');
      this.added = pipe.transform(this.lot.initialDate,'dd.MM.yyyy hh:mm:ss');
      const currentDate = new Date(Date.now());
      this.isValidAuction = currentDate < new Date(this.lot.deadline);
      this.isOwner = Number(this.lot?.ownerId) === Number(this.userToken.userId);
      this.isAdmin = this.userToken.isAdmin;
    }

  onDelete(){
    if ((this.isAdmin || this.isOwner) && this.lot?.id)
    this.subscription.add(this.lotService.Delete(
      this.lot?.id).subscribe(() => 
        this.proxyService.onDeleteLot.emit(this.lot?.id)));
  }

  onBet(){
    this.router.navigate([`/auction/${this.lot?.auctionId}`]);
  }

  onEdit(){
    this.router.navigate([`/lot/${this.lot?.id }`]);
  }
}
