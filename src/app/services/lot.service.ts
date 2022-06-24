import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUCTION_API_URL } from '../app.injection-tokens';
import { serviceNames } from '../Functions/backend';
import { Lot } from '../models/lot';

@Injectable({
  providedIn: 'root'
})
export class LotService {
  private urlLot = `${this.apiUrl}api/${serviceNames.lots}`;
  private urlLotByCategory = `${this.apiUrl}api/${serviceNames.lotsByCategory}`;
  
  constructor(
    private httpClient: HttpClient,
    @Inject(AUCTION_API_URL) private apiUrl: string
    ) { }

  getlotsByCategory(categoryId: Number): Observable<Lot[]>{
    const url = `${this.urlLotByCategory}/${categoryId}`;
    return this.httpClient.get<Lot[]>(url);
  }

  getLotById(lotId: string): Observable<Lot>{
    const url = `${this.urlLot}/${lotId}`;
    return this.httpClient.get<Lot>(url);
  }

  saveLot(lot: Lot, files: File[]) : Observable<any>{

    const url = this.urlLot;
    const formData: FormData = new FormData();

    formData.append('id', lot?.id.toString() );
    formData.append('name', lot?.name);
    formData.append('description', lot?.description);
    formData.append('initialPrice', lot?.initialPrice.toString());
    formData.append('categoryId', lot?.categoryId.toString());
    formData.append('deadline', lot?.deadline.toUTCString());
    formData.append('ownerId', lot?.ownerId.toString());
    for(var i=0; i< files.length; i++){
      formData.append('files', files[i] );
    }
    
    if (lot.id > 0 ){
      return this.httpClient.put<any>(url, formData)
    }
    else {
      alert('post');
      return this.httpClient.post<any>(url, formData);
    }
  }
}
