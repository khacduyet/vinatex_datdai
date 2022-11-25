import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private NhaMayStore = new Subject<any>();
  private IdNhaMay = '';
  constructor() { }
  setNhaMay(IdNhaMay){
    this.IdNhaMay = IdNhaMay;
    this.NhaMayStore.next(IdNhaMay);
  }
  getNhaMay():Observable<any>{
    return this.NhaMayStore;
  }
  getCurrent(){
    return this.IdNhaMay;
  }
}
