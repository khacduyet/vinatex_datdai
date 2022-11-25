import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chonmaytheocongdoan',
  templateUrl: './chonmaytheocongdoan.component.html',
  styleUrls: ['./chonmaytheocongdoan.component.css']
})
export class ChonmaytheocongdoanComponent implements OnInit {
  items:{[key:string]:any}={};
  selectedItems:any=[];
  constructor(private _activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    this.selectedItems = [];
  }
  accept(){
    console.log(this.items);
    for(let key in this.items){
      if(this.items[key].checked){
        this.selectedItems.push(this.items[key]);
      }
    }

    this._activeModal.close(this.selectedItems.map(
      ele=>{
        return {
          prop:ele.Id.split('-').join('_'),
          IddmMay :ele.Id,
          Id:''
        }
      }
    )); 
  }
}
