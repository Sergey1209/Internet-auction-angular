import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUCTION_API_URL } from '../app.injection-tokens';
import { serviceNames } from '../Functions/backend';
import { Auction } from '../models/Auction';
import { Bet } from '../models/bet';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private baseApiUrl = `${this.apiUrl}api/${serviceNames.auction}`;

  constructor(private httpClient: HttpClient,
    @Inject(AUCTION_API_URL) private apiUrl: string ) { }
    
  getAuctionById(id: number) : Observable<Auction> {
    const url = `${this.baseApiUrl}/${id}`;
    return this.httpClient.get<Auction>(url);
  }

  setBet(id: number, betValue: number) : Observable<any>{
    const url = `${this.baseApiUrl}/${id}/bet`;
    const body = {id: id, betValue: betValue};
    return this.httpClient.post(url, body);
  }

  getLastBetValue(id: number) : Observable<Bet>{
    const url = `${this.baseApiUrl}/${id}/bet`;
    return this.httpClient.get<Bet>(url);
  }
}
