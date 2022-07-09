import { EventEmitter, Injectable, Output } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor() { }

  @Output() 
    onSelectCategory = new EventEmitter<Category>();
}
