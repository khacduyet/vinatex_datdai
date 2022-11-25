import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chonquycachdonggoimodal',
  templateUrl: './chonquycachdonggoimodal.component.html',
  styleUrls: ['./chonquycachdonggoimodal.component.css']
})
export class ChonquycachdonggoimodalComponent implements OnInit {

  items: any = [];
  selectedItems: any = [];
  IdQuyTrinh: any;
  KeyWord: any = '';
  opt: any = '';
  checkedAll: boolean = false;
  layitem: any;
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    }
  ];
  newTableItem: any = {};

  constructor(private _activeModal: NgbActiveModal, private _services: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.newTableItem = {
      Id: "",
      IdGiaoKeHoachSanXuat_MatHang: this.IdQuyTrinh,
      isXoa: false,
    };
    if (this.selectedItems == undefined || this.selectedItems == null) {
      this.selectedItems.filter(objselectedItems => {
        objselectedItems.objQuyCachDongGoi = this.items.filter(obj => this.newTableItem.IddmQuyCachDongGoi == obj.value)[0];
      });
    }
    // this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
    //   let selected = this.items.filter(item => sItem.IddmItem === item.IddmItem)[0];
    //   if (selected) {
    //     selected.checked = true;
    //   }
    // });
  }
  resetFilter() {
    this.KeyWord = '';
  }

  add() {
    if (this.newTableItem.IddmQuyCachDongGoi == undefined || this.newTableItem.IddmQuyCachDongGoi == null)
      this.toastr.error("Bạn chưa chọn quy cách đóng gòi");
    if (this.newTableItem.KhoiLuong == undefined || this.newTableItem.KhoiLuong == null || this.newTableItem.KhoiLuong <= 0)
      this.toastr.error("Bạn chưa nhập số lượng");
    else {
      if (this.selectedItems == undefined || this.selectedItems == null)
        this.selectedItems = [];
      this.newTableItem.objQuyCachDongGoi = this.items.filter(obj => this.newTableItem.IddmQuyCachDongGoi == obj.value)[0];
      this.selectedItems.push(this.newTableItem);
      this.newTableItem = {
        Id: "",
        IdGiaoKeHoachSanXuat_MatHang: this.IdQuyTrinh,
        isXoa: false,
      }
    }
  }

  delete(index) {
    let item = this.selectedItems.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      item.isDelete = true;
      this.selectedItems.push(JSON.parse(JSON.stringify(item)));
    }
  }

  accept() {
    if(validVariable(this.newTableItem.IddmQuyCachDongGoi) && validVariable(this.newTableItem.KhoiLuong) && this.newTableItem.KhoiLuong>0){
      this.add()
    }
    // let tong = 0;
    // this.selectedItems.filter(obj => {
    //   tong += obj.KhoiLuong;
    // });
    // if (this.layitem.KhoiLuongKeHoach < tong) {
    //   this.toastr.error("Không được lớn hơn Kế hoạch sản xuất");
    // }
    // else {
      this._activeModal.close({ listItem: this.selectedItems });
    // }
  }

}
