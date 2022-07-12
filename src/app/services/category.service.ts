import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUCTION_API_URL } from '../app.injection-tokens';
import { serviceNames } from '../functions/backend';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseApiUrl = `${this.apiUrl}api`;

  constructor(
    private httpClient: HttpClient,
    @Inject(AUCTION_API_URL) private apiUrl: string
    ) {  }
  
  getCategories() : Observable<Category[]>{
    const url = `${this.baseApiUrl}/${serviceNames.lotCategory}`;
    return this.httpClient.get<Category[]>(url);
  }

  getLotCategoryById(id: string) : Observable<Category> {
    const url = `${this.baseApiUrl}/${serviceNames.lotCategory}/${id}`;
    return this.httpClient.get<Category>(url);
  }

  editLotCategory(lotCategory: Category, file: File) : Observable<any>{
    const url = `${this.baseApiUrl}/${serviceNames.lotCategory}`;
    const formData: FormData = new FormData();

    formData.append('name', lotCategory?.name );
    formData.append('id', lotCategory?.id.toString());

    if (file){
      const key = typeof file === 'string' ? 'notChangedfile' : 'file';
      formData.append(key, file);
    }

    if (lotCategory.id > 0 ){
      return this.httpClient.put<any>(url, formData)
    }
    else {
      return this.httpClient.post<any>(url, formData);
    }

  }
  
}
