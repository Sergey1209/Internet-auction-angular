import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot';
import { ACCESS_TOKEN_KEY, AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService,
    private jwthelper: JwtHelperService,
  ){  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id'); 
    if (id != null && id != '0' && id != ''){  
      this.subscription.add(this.lotService.getLotById(id).subscribe(lot => {      
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        const userId = token ? this.jwthelper.decodeToken(token).sub : 0;
        if (Number(userId) !== Number(lot.ownerId)){
          this.router.navigate(['/home']);
        }
        this.lot = lot;
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
      this.router.navigate(['/login']);
    }
    else{
      this.lotService.saveLot(this.lot, [this.file1, this.file2, this.file3] as File[]).subscribe(x => this.toMain());
    }
  }

  dateChanged(date:Date){
    this.lot.deadline = date;
    
  }

  cancel(){
    this.router.navigate(['']);
  }

}
