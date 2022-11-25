import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chonkienbonghoimodal',
  templateUrl: './chonkienbonghoimodal.component.html',
  styleUrls: ['./chonkienbonghoimodal.component.css']
})
export class ChonkienbonghoimodalComponent implements OnInit {
  items: any = [];
  selectedItems: any = [];
  maxSelected: any = 0;
  resultTrongLuong: any = 0;
  TenLoBong: any = '';
  currentTrongLuong: any = 0;
  constructor(private _activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    this.averagePickedTrongLuong();
    console.log(this.currentTrongLuong);
  }
  pickItem(Id) {
    if (this.selectedItems.length < this.maxSelected) {
      let index = this.items.findIndex((item: any) => item.Id === Id);
      let tempPickedItem = this.items.splice(index, 1)[0];
      this.selectedItems.push(tempPickedItem);
      this.averagePickedTrongLuong();
    }
  }
  refundItem(Id) {
    let index = this.items.findIndex((item: any) => item.Id === Id);
    let tempPickedItem = this.selectedItems.splice(index, 1)[0];
    this.items.push(tempPickedItem);
    this.averagePickedTrongLuong();
  }
  averagePickedTrongLuong() {
    let TotalTrongLuong = this.selectedItems.reduce((sum, item) => {
      return sum + item.TrongLuong
    }, 0);
    this.currentTrongLuong = TotalTrongLuong / this.selectedItems.length;
    this.itemsSort();
  }
  itemsSort(){
    this.items.sort((a, b) => {
      return Math.abs(this.resultTrongLuong - a) - Math.abs(this.resultTrongLuong - b);
    })
  }
  accept(){
    this._activeModal.close({listItem :this.selectedItems,BQMic:this.currentTrongLuong})
  }
}
