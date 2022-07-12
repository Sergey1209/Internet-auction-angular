import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProxyService } from 'src/app/services/proxy.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './category-edit.component.html',
  styleUrls: ['../../CSS/elements-form.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  file: File | null | undefined | string = null;
  category : Category;

  constructor(
    private lotCategoryService: CategoryService, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private proxyService: ProxyService,
    ) { 
      this.category = new Category(0,'','');
     }
    
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onFileSelected(event: Event){
    this.file = (event.target as HTMLInputElement).files?.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.category = new Category(this.category.id, this.category.name, event.target.result);
    }
    reader.readAsDataURL(this.file as Blob);
  }

  ngOnInit(): void {  
    const id = this.activeRoute.snapshot.paramMap.get('id'); 
    if (id != null){  
      this.subscription.add(this.lotCategoryService.getLotCategoryById(id).subscribe(categ => {
        this.category = categ
        this.file = this.getImgNameByUrl(categ.urlIcon);
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
  
  save(){
    this.subscription.add(this.lotCategoryService
      .editLotCategory(this.category, this.file as File)
      .subscribe(() => {
        this.router.navigate(['/home']);
        this.proxyService.setCategory(this.category);
      })
    );
  }

}
