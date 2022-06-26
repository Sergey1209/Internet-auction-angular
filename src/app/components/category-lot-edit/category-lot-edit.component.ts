import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryLot } from 'src/app/models/category-lot';
import { CategoryLotService } from 'src/app/services/category-lot.service';

@Component({
  selector: 'app-edit-lot-category',
  templateUrl: './category-lot-edit.component.html',
  styleUrls: ['../../CSS/elements-form.css']
})
export class EditLotCategoryComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  file: File | null | undefined = null;
  lotCategory : CategoryLot;

  constructor(
    private lotCategoryService: CategoryLotService, 
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { 
      this.lotCategory = new CategoryLot(0,'','');
     }
    
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onFileSelected(event: Event){
    this.file = (event.target as HTMLInputElement).files?.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.lotCategory = new CategoryLot(this.lotCategory.id, this.lotCategory.name, event.target.result);
    }

    reader.readAsDataURL(this.file as Blob);
  }

  ngOnInit(): void {  
    const id = this.activeRoute.snapshot.paramMap.get('id'); 
    if (id != null){  
      this.subscription.add(this.lotCategoryService.getLotCategoryById(id).subscribe(categ => this.lotCategory = categ));
    }
  }
  
  save(){
    this.lotCategoryService
      .editLotCategory(this.lotCategory, [this.file as File])
      .subscribe(x => {
        this.ngOnDestroy();
        this.router.navigate(['']);
      });
  }

}
