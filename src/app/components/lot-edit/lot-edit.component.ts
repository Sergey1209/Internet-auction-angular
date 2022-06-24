import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-lot-edit',
  templateUrl: './lot-edit.component.html',
  styleUrls: ['../../CSS/elements-form.css']
})
export class LotEditComponent implements OnInit {
  private subscription = new Subscription();
  lot: Lot = new Lot(0, '', '', 0, [], new Date(Date.now()), 0, '', 0);

  file1: File | null | undefined = null;
  file2: File | null | undefined = null;
  file3: File | null | undefined = null;
  
  imgUrl1: string = this.lot?.images[0];
  imgUrl2: string = this.lot?.images[1];
  imgUrl3: string = this.lot?.images[2];

  @Output()
    currentImgIndex = 0;

  @Input()
    set setLot(val: Lot){
      this.lot = val;
    }
    
  constructor(
    private activeRoute: ActivatedRoute,
    private lotService:LotService,
    private router: Router) {
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id'); 
    if (id != null && id != '0' && id != ''){  
      this.subscription.add(this.lotService.getLotById(id).subscribe(lot => {alert(lot.name); this.lot = lot}));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(){
    this.lotService.saveLot(this.lot, [this.file1, this.file2, this.file3] as File[]).subscribe();
    // this.ngOnDestroy();
    // this.router.navigate(['']);
  }

}
