import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Lot } from 'src/app/models/lot';
import { UserToken } from 'src/app/models/user-token';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.css']
})
export class LotComponent implements OnInit {
  constructor(
    private lotService: LotService,
    private router: Router,
    private userToken: UserToken) { }

  ngOnInit(): void {  }

  @Output()
    currentImgIndex = 0;

  isValidAuction: boolean = false;
  
  lot: Lot | null = null;
  isOwner:  boolean = false;
  isAdmin:  boolean = false;
  deadline: string | null = null;
  added: string | null = null;

  @Input()
    set setLot(lot: Lot){
      this.lot = lot; 
      const pipe = new DatePipe('en-US');
      this.deadline = pipe.transform(this.lot.deadline,'dd.MM.yyyy hh:mm:ss');
      this.added = pipe.transform(this.lot.initialDate,'dd.MM.yyyy hh:mm:ss');
      const currentDate = new Date(Date.now());
      const deadline = new Date(this.lot.deadline)
      this.isValidAuction = currentDate < deadline;
      this.isOwner = Number(this.lot?.ownerId) === Number(this.userToken.userId);
      this.isAdmin = this.userToken.isAdmin;
    }

  onDelete(){
    if ((this.isAdmin || this.isOwner) && this.lot?.id)
      this.lotService.Delete(this.lot?.id).subscribe(x => this.router.navigate(['/home']));
  }

}
