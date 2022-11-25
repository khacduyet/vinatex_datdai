import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kienlocongdieuchinhmodal',
  templateUrl: './kienlocongdieuchinhmodal.component.html',
  styleUrls: ['./kienlocongdieuchinhmodal.component.css']
})
export class KienlocongdieuchinhmodalComponent implements OnInit {

  item: any = {};
  itemRemove: any = {};
  item_new: any = {};
  selected: any = {};
  IddmItem: any = '';
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset',
      align: 'center',
    },
    {
      header: 'Tên lô hàng',
      field: 'TenLoHang',
      width: 'unset',
      align: 'center',
    },
    {
      header: 'Vị trí',
      field: 'TendmViTri',
      width: 'unset',
      align: 'center',
    },
    {
      header: 'Mic',
      field: 'Mic',
      width: 'unset',
      align: 'center',
    },
    // {
    //   header: 'Trọng lượng',
    //   field: 'TrongLuong',
    //   width: 'unset',
    //   align: 'center',
    // },
  ];
  paging1: any = {};
  paging: any = {};
  isCheck = false;
  filter: any = {};
  itemChuaXeps = [];
  itemFulls = [];
  listItem:any = [];
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log(this.listItem)
    this.paging1.CurrentPage = 1;
    this.paging1.TotalPage = 5;
    this.paging1.TotalItem = this.item_new.listFull.length;
    this.item.listFull = this.item_new.listFull.slice(0, 15);
    this.itemFulls = this.item_new.listFull.slice(0, 15);
    if(this.listItem.length > 0){
      let dem = 0;
      for(let i = 0; i< this.item_new.listChuaXep.length; i++){
        for(let j = 0; j< this.listItem.length; j++){
        {
          if(this.item_new.listChuaXep[i].IddmItem === this.listItem[j].IddmItemDieuChinh){
            this.item_new.listChuaXep[i].isChon = true;
            dem++;
            break;
          }
        }
        if(dem === (this.listItem.length ))
          break
        }
      }
      //
      for(let i = 0; i< this.item_new.listFull.length; i++){
        for(let j = 0; j< this.listItem.length; j++){
        {
          if(this.item_new.listFull[i].IddmItem === this.listItem[j].IddmItemDieuChinh){
            this.item_new.listFull[i].isChon = true;
            dem++;
            break;
          }
        }
        if(dem === (this.listItem.length ))
          break
        }
      }
    }

    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item_new.listChuaXep.length;
    this.item.listChuaXep = this.item_new.listChuaXep.slice(0, 15);
    this.itemChuaXeps = this.item_new.listChuaXep.slice(0, 15);

    this.item_new.listChuaXep.filter(obj => {
      obj.checked = false;
    });

    this.item_new.listFull.filter(obj => {
      obj.checked = false;
    });
    for (let i = 0; i < this.item.listChuaXep.length; i++) {
      if (this.item.listChuaXep[i].IddmItem == this.IddmItem) {
        this.selected = this.item.listChuaXep[i];
        this.selected.checked = true;
        this.isCheck = true;
      }
    }
    if (this.isCheck === false) {
      for (let i = 0; i < this.item.listFull.length; i++) {
        if (this.item.listFull[i].IddmItem == this.IddmItem) {
          this.selected = this.item.listFull[i];
          this.selected.checked = true;
        }
      }
    }
  }
  accept() {
    this.activeModal.close(
      { data: this.selected }
    );
  }
  itemCheck(item) {
    item.checked = !item.checked;
    if (item.checked == true){
      this.selected = item;
      this.isCheck = true;
    }
    else{
      this.selected = {};
    }
    this.item_new.listFull.filter(obj => {
      obj.checked = false;
    });
    this.item_new.listChuaXep.filter(obj => {
      obj.checked = false;
    });
  }
  changePage1(event) {
    this.paging1.CurrentPage = event.page + 1;
    var start = 15 * (event.page) + 1;
    var end = start + 14;
    if ((start + 15) > this.paging1.TotalItem)
      end = this.paging1.TotalItem;
    this.item.listFull = this.item_new.listFull.slice(start, end);
    this.itemFulls = this.item_new.listFull.slice(start, end);
    if (this.isCheck === false) {
      for (let i = 0; i < this.item.listFull.length; i++) {
        if (this.item.listFull[i].IddmItem == this.IddmItem) {
          this.selected = this.item.listFull[i];
          this.selected.checked = true;
        }
      }
    }
    if(this.filter.KeyWord !== '' && this.filter.KeyWord !== undefined)
        this.GetQuyTrinhFilter();
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page) + 1;
    var end = start + 14;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listChuaXep = this.item_new.listChuaXep.slice(start, end);
    this.itemChuaXeps = this.item_new.listChuaXep.slice(start, end);
    if(this.isCheck === false){
      for (let i = 0; i < this.item.listChuaXep.length; i++) {
        if (this.item.listChuaXep[i].IddmItem == this.IddmItem) {
          this.selected = this.item.listChuaXep[i];
          this.selected.checked = true;
          this.isCheck = true;
        }
      }
    }
    if(this.filter.KeyWord !== '' && this.filter.KeyWord !== undefined)
      this.GetQuyTrinhFilter();
  }
  GetQuyTrinhFilter()
  {
    let filter = this.item_new.listChuaXep.filter(obj => {
      let Ten = obj.Ten.toLowerCase();
      let indexOf = Ten.indexOf(this.filter.KeyWord);
      return indexOf != -1
    });
    this.item.listChuaXep = filter;

    let filterFull = this.item_new.itemFulls.filter(obj => {
      let Ten = obj.Ten.toLowerCase();
      let indexOf = Ten.indexOf(this.filter.KeyWord);
      return indexOf != -1
    });
    this.item.itemChuaXeps = filterFull;
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listChuaXep.length;
    this.item.listChuaXep = this.item.listChuaXep.slice(0, 15);
    this.itemChuaXeps = this.item.listChuaXep.slice(0, 15);

    // for(let i =0; i < this.itemChuaXeps.length; i++){
    //   if(this.itemChuaXeps[i].Ten !== null){
    //     if(this.itemChuaXeps[i].Ten.toLowerCase().includes(this.filter.KeyWord)){
    //       items.push(this.itemChuaXeps[i]);
    //       continue;
    //     }
    //   }
    //   if(this.itemChuaXeps[i].TendmViTri !== null){
    //     if(this.itemChuaXeps[i].TendmViTri.toLowerCase().includes(this.filter.KeyWord))
    //     {
    //       items.push(this.itemChuaXeps[i]);
    //       continue;
    //     }
    //   }
      
    // }
    // this.item.listChuaXep = items;
    // items = [];
    // for(let i =0; i < this.itemFulls.length; i++){
    //   if(this.itemFulls[i].Ten !== null){
    //     if(this.itemFulls[i].Ten.toLowerCase().includes(this.filter.KeyWord)){
    //       items.push(this.itemFulls[i]);
    //       continue;
    //     }
    //   }
      // if(this.itemFulls[i].TendmViTri !== null){
      //   if(this.itemFulls[i].TendmViTri.toLowerCase().includes(this.filter.KeyWord))
      //   {
      //     items.push(this.itemFulls[i]);
      //     continue;
      //   }
      // }
    // }
    // this.item.listFull = items;
  }
  GetQuyTrinhRefresh()
  {
    this.filter.KeyWord = '';
    this.item.listChuaXep = this.itemChuaXeps;
    this.item.listFull = this.itemFulls;

  }
}
