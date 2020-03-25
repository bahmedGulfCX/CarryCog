import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';   

@Injectable({
  providedIn: 'root'
})
export class RefreshHeaderService {
  RefreshHeader = new EventEmitter();    
  subsVar: Subscription;   
  constructor() { }

  onRefreshHeader() {    
    this.RefreshHeader.emit();    
  } 
}
