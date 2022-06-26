import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot';
import { AuthService } from 'src/app/services/auth.service';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-lot-edit',
  templateUrl: './lot-edit.component.html',
  styleUrls: ['../../CSS/elements-form.css', './lot-edit.component.css']
})
export class LotEditComponent implements OnInit {
  private subscription = new Subscription();
  lot: Lot = new Lot(0, '', '', 0, [], new Date(Date.now()), 0, '', 0);

  file1: File | null | undefined = null;
  file2: File | null | undefined = null;
  file3: File | null | undefined = null;
  
  imgUrl1: string = '';
  imgUrl2: string = '';
  imgUrl3: string = '';
  categoryId: number = 0;

  @Output()
    currentImgIndex = 0;

  @Input()
    set setLot(val: Lot){
      this.lot = val;
    }
    
  constructor(
    private activeRoute: ActivatedRoute,
    private lotService:LotService,
    private router: Router,
    private authService: AuthService
  ){  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id'); 
    if (id != null && id != '0' && id != ''){  
      this.subscription.add(this.lotService.getLotById(id).subscribe(lot => {
        this.lot = lot;
        this.imgUrl1 = this.lot.images[0];
        this.imgUrl2 = this.lot.images[1];
        this.imgUrl3 = this.lot.images[2];
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private toMain(){
    this.ngOnDestroy();
    this.router.navigate(['']);
  }

  save(){
    if (!this.authService.isAuthenticated()){
      alert('You need to login');
      this.router.navigate(['/login']);
    }
    else{
      this.lotService.saveLot(this.lot, [this.file1, this.file2, this.file3] as File[]).subscribe(x => this.toMain());
    }
  }

  dateChanged(date:any){
    this.lot.deadline = date;
  }

  cancel(){
    this.router.navigate(['']);
  }

}
