import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AUCTION_API_URL } from '../app.injection-tokens';
import { serviceNames } from '../Functions/backend';
import { CategoryLot } from '../models/category-lot';

@Injectable({
  providedIn: 'root'
})
export class CategoryLotService {
  private baseApiUrl = `${this.apiUrl}api`;

  constructor(
    private httpClient: HttpClient,
    @Inject(AUCTION_API_URL) private apiUrl: string
    ) {  }
  
  getLotCategories() : Observable<CategoryLot[]>{
    const url = `${this.baseApiUrl}/${serviceNames.lotCategory}`;
    return this.httpClient.get<CategoryLot[]>(url);
  }

  getLotCategoryById(id: string) : Observable<CategoryLot> {
    const url = `${this.baseApiUrl}/${serviceNames.lotCategory}/${id}`;
    return this.httpClient.get<CategoryLot>(url);
  }

  editLotCategory(lotCategory: CategoryLot, files: File[]) : Observable<any>{
    const url = `${this.baseApiUrl}/${serviceNames.lotCategory}`;
    const formData: FormData = new FormData();

    formData.append('name', lotCategory?.name );
    formData.append('id', lotCategory?.id.toString() );
    for(var i=0; i< files.length; i++){
      formData.append('files', files[i] );
    }
    
    if (lotCategory.id > 0 ){
      return this.httpClient.put<any>(url, formData)
    }
    else {
      return this.httpClient.post<any>(url, formData);
    }

  }
  
}
