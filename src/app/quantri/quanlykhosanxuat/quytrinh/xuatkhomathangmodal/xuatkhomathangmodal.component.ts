import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-xuatkhomathangmodal',
  templateUrl: './xuatkhomathangmodal.component.html',
  styleUrls: ['./xuatkhomathangmodal.component.css']
})
export class XuatkhomathangmodalComponent implements OnInit {

  listMatHang: any = [];
  listItem: any = [];
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Tên lô',
      field: 'TenLoHang',
      width: 'unset'
    },
    {
      header: 'Số lượng',
      field: 'Ton',
      width: 'unset'
    },
  ];
  checkedAll: boolean = false;
  paging: any = {};
  item: any = {};
  KeyWord: any = '';
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log(this.cols)
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listMatHang.length;
    this.item.listItem = this.listMatHang.slice(0,15);

    if(this.listItem != undefined && this.listItem!= null && this.item.listItem!= undefined && this.item.listItem!= null)
    {
      this.listItem.forEach(element => {
        var itemFind = this.item.listItem.find(function (obj) {
          return obj.IddmItem == element.IddmItem;
          // return obj.Id == element.IddmItem;
        });
        itemFind.checked = true;
      });
    }

  }
  accept() {
    let data: any = []
    this.listMatHang.forEach(element => {
      if (element.checked == true)
        data.push(element);
    });
    this.activeModal.close(
      { data: data }
    );
  }
  checkAll(e) {
    if (e.checked) {
      this.listMatHang.forEach(item => {
        item.checked = true;
      });
    } else {
      this.listMatHang.forEach(item => {
        item.checked = false;
      });
    }

  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end =  start + 15;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listItem = this.listMatHang.slice(start,end);
  }
  // timKiemMatHang() {
  //   var listItem : any = [];
  //   this.listItem_new.forEach(element => {
  //     if(element.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || element.TenLoHang.toLowerCase().includes(this.KeyWord.toLowerCase()))
  //       listItem.push(element)
  //   });
  //   debugger
  //   this.listItem_new = listItem;
  // }
  // refresh(){
  //   this.KeyWord = '';
  //   var start = 15 * (this.paging.CurrentPage - 1);
  //   var end =  start + 15;
  //   if((start + 15) > this.paging.TotalItem)
  //     end= this.paging.TotalItem;
  //   this.item.listItem = this.listMatHang.slice(start,end);
  // }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listItem_copy = deepCopy(this.item.listItem);
      let filter: any = this.item.listItem.filter(obj => {
        let Ten = obj.Ten.toLowerCase();
        let indexOf = Ten.indexOf(this.KeyWord.toLowerCase());
        return indexOf != -1
      });
      this.item.listItem = filter;
    }
    else {
      this.item.listItem = deepCopy(this.item.listItem_copy);
    }
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }
}
