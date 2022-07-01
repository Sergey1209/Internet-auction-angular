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

  getAllLots(minId:number): Observable<Lot[]>{
    const offset = 12;
    const url = `${this.urlLot}/${minId}-${minId === 0 ? offset : minId - offset}`;
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

  saveLot(lot: Lot, files: (File|string)[] ) : Observable<any>{
    const url = this.urlLot;
    const formData: FormData = new FormData();

    formData.append('id', lot?.id.toString() );
    formData.append('name', lot?.name);
    formData.append('description', lot?.description);
    if (lot?.initialPrice) formData.append('initialPrice', lot?.initialPrice.toString());
    formData.append('categoryId', lot?.categoryId.toString());
    if (lot?.deadline) formData.append('deadline', new Date(lot?.deadline).toDateString());
    formData.append('ownerId', lot.id > 0 ? lot?.ownerId.toString() : '0');
    
    for(var i=0; i< files.length; i++){
      const file = files[i];
      if (file){
        const key = typeof file === 'string' ? 'notChangedfiles' : 'files';
        formData.append(key, files[i]);
      }
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
