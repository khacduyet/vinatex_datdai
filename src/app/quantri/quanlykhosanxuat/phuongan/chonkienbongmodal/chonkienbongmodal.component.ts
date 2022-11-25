import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chonkienbongmodal',
  templateUrl: './chonkienbongmodal.component.html',
  styleUrls: ['./chonkienbongmodal.component.css']
})
export class ChonkienbongmodalComponent implements OnInit {
  items: any = [];
  selectedItems: any = [];
  maxSelected: any = 0;
  resultMic: any = 0;
  TenLoBong: any = '';
  currentMic: any = 0;
  constructor(private _activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    this.averagePickedMic();
  }
  pickItem(Id) {
    if (this.selectedItems.length < this.maxSelected) {
      let index = this.items.findIndex((item: any) => item.Id === Id);
      let tempPickedItem = this.items.splice(index, 1)[0];
      this.selectedItems.push(tempPickedItem);
      this.averagePickedMic();
    }
  }
  refundItem(Id) {
    let index = this.selectedItems.findIndex((item: any) => item.Id === Id);
    let tempPickedItem = this.selectedItems.splice(index, 1)[0];
    this.items.push(tempPickedItem);
    this.averagePickedMic();
  }
  averagePickedMic() {
    let TotalMic = this.selectedItems.reduce((sum, item) => {
      return sum + item.Mic
    }, 0);
    this.currentMic = TotalMic / this.selectedItems.length;
    this.itemsSort();
  }
  itemsSort(){
    this.items.sort((a, b) => {
      return Math.abs(this.resultMic - a) - Math.abs(this.resultMic - b);
    })
  }
  accept(){
    this._activeModal.close({listItem :this.selectedItems,BQMic:this.currentMic})
  }
}
