import { EventEmitter, Injectable, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable, pairwise } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';
import { Category } from '../models/category';
import { Lot } from '../models/lot';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  ediLot: Lot | null = null;
  ediCategory: Category | null = null;
  prevousRoute: string = '';

  constructor(private router:Router) {
    this.router.events
    .pipe(
      filter(e => e instanceof NavigationEnd),
      pairwise()
    )
    .subscribe((e: any[]) => {
      this.prevousRoute = e[0].url;
    });
  }

  @Output() 
    onSelectCategory = new EventEmitter<Category>();

  @Output()
    homeComponent = new EventEmitter<HomeComponent>();

  @Output()
    getHomeComponent = new EventEmitter();
  
  @Output()
    updateLotData = new EventEmitter<Lot>();

  @Output()
    onDeleteLot = new EventEmitter<number>();

  private lotSubject$$: BehaviorSubject<Lot> = 
    new BehaviorSubject(new Lot(0, '', '', 0, [], new Date(Date.now()), 0, '', 0, 0, 0, new Date(Date.now())));
  lotData: Observable<Lot> = this.lotSubject$$.asObservable();

  setData(newValue: Lot) {
    this.lotSubject$$.next(newValue);
  }
  
  private categorySubject$$: BehaviorSubject<Category> = new BehaviorSubject(new Category(0, '', '', ));
  categoryData$: Observable<Category> = this.categorySubject$$.asObservable();

  setCategory(newValue: Category) {
    this.categorySubject$$.next(newValue);
  }
}
