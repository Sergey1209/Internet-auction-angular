import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { AUCTION_API_URL } from '../app.injection-tokens';
import { serviceNames } from '../Functions/backend';
import { Lot } from '../models/lot';
import { AuthService } from './auth.service';

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

  getlotsBySearch(searchString: string): Observable<Lot[]>{
    const url = `${this.urlLot}/search`;
    let headers = new HttpHeaders();
    headers.append('searchString', searchString);
    return this.httpClient.get<Lot[]>(url, {headers: headers});
  }

  saveLot(lot: Lot, files: File[]) : Observable<any>{
    const url = this.urlLot;
    const formData: FormData = new FormData();

    formData.append('id', lot?.id.toString() );
    formData.append('name', lot?.name);
    formData.append('description', lot?.description);
    formData.append('initialPrice', lot?.initialPrice.toString());
    formData.append('categoryId', lot?.categoryId.toString());
    formData.append('deadline', lot?.deadline.toString());
    formData.append('ownerId', lot.id > 0 ? lot?.ownerId.toString() : '0');
    for(var i=0; i< files.length; i++){
      formData.append('files', files[i]);
    }
    
    if (lot.id > 0 ){
      return this.httpClient.put<any>(url, formData)
    }
    else {
      return this.httpClient.post<any>(url, formData);
    }
  }

  Delete(lotId: number):Observable<any>{
    const url = `${this.urlLot}/${lotId}`;
    return this.httpClient.delete(url);
  }
}
