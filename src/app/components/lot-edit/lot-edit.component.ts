import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot';
import { UserToken } from 'src/app/models/user-token';
import { LotService } from 'src/app/services/lot.service';
import { ProxyService } from 'src/app/services/proxy.service';
import { filter, pairwise } from 'rxjs/operators';
// import 'rxjs/add/operator/pairwise';


@Component({
  selector: 'app-lot-edit',
  templateUrl: './lot-edit.component.html',
  styleUrls: ['../../CSS/elements-form.css', './lot-edit.component.css']
})
export class LotEditComponent implements OnInit {
  private subscription = new Subscription();
  lot: Lot = new Lot(0, '', '', 0, [], new Date(Date.now()), 0, '', 0, 0, 0, new Date(Date.now()));
  prevousRoute : string = ''

  file0: File | null | undefined | string = null;
  file1: File | null | undefined | string = null;
  file2: File | null | undefined | string = null;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private lotService:LotService,
    private router: Router,
    private userToken: UserToken,
    private proxyService: ProxyService
  ){   }

  ngOnInit(): void {
    this.prevousRoute = this.proxyService.prevousRoute;
    const id_str = this.activatedRoute.snapshot.paramMap.get('id'); 
    if (id_str && id_str != '0'){  
      this.subscription.add(this.lotService.getLotById(id_str).subscribe(lot => {      
        if (Number(this.userToken.userId) !== Number(lot.ownerId)){
          this.exit();
          return;
        }
        this.lot = lot;

        this.file0 = this.getImgNameByUrl(lot.images[0]);
        this.file1 = this.getImgNameByUrl(lot.images[1]);
        this.file2 = this.getImgNameByUrl(lot.images[2]);
      }));
    }
  }

  exit(){
    this.router.navigate([`${this.prevousRoute}`]);
  }

  private getImgNameByUrl(url: string){
    if (url){
      const arr = url.split('/');
      const name = arr[arr.length-1];
      return name;
    }
    else 
      return null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(){
    this.proxyService.ediLot = this.lot;
    if (this.userToken.isAuthenticated && this.lot){
      this.subscription.add(this.lotService
        .saveLot(this.lot, [this.file0, this.file1, this.file2] as File[])
        .subscribe(x => {
          this.proxyService.setData(this.lot);
          this.exit();
          this.proxyService.updateLotData.emit(this.lot);
        }));
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  dateChanged(date:Date){
    if (this.lot){
      this.lot.deadline = date;
    }
  }

  cancel(){
    this.exit();
  }

}
