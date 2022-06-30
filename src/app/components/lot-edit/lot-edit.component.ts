import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { Lot } from 'src/app/models/lot';
import { UserToken } from 'src/app/models/user-token';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-lot-edit',
  templateUrl: './lot-edit.component.html',
  styleUrls: ['../../CSS/elements-form.css', './lot-edit.component.css']
})
export class LotEditComponent implements OnInit {
  private subscription = new Subscription();
  lot: Lot = new Lot(0, '', '', 0, [], new Date(Date.now()), 0, '', 0, 0, 0);

  file0: File | null | undefined | string = null;
  file1: File | null | undefined | string = null;
  file2: File | null | undefined | string = null;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private lotService:LotService,
    private router: Router,
    private userToken: UserToken
  ){  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id'); 
    if (id != null && id != '0' && id != ''){  
      this.subscription.add(this.lotService.getLotById(id).subscribe(lot => {      
        if (Number(this.userToken.userId) !== Number(lot.ownerId)){
          this.router.navigate(['/home']);
          return;
        }
        this.lot = lot;

        this.file0 = this.getImgNameByUrl(lot.images[0]);
        this.file1 = this.getImgNameByUrl(lot.images[1]);
        this.file2 = this.getImgNameByUrl(lot.images[2]);
      }));
    }
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

  private toMain(){
    this.ngOnDestroy();
    this.router.navigate(['/home']);
  }

  save(){
    if (!this.userToken.isAuthenticated){
      this.ngOnDestroy();
      this.router.navigate(['/login']);
    }
    else{
      this.lotService
        .saveLot(this.lot, [this.file0, this.file1, this.file2] as File[])
        .pipe(tap(x => this.toMain()))
        .subscribe();
    }
  }

  dateChanged(date:Date){
    this.lot.deadline = date;
  }

  cancel(){
    this.router.navigate(['']);
  }

}
