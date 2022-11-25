import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kehoachnhapnguyenlieuitemmodal',
  templateUrl: './kehoachnhapnguyenlieuitemmodal.component.html',
  styleUrls: ['./kehoachnhapnguyenlieuitemmodal.component.css']
})
export class KehoachnhapnguyenlieuitemmodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {
    "Id": "",
    "idKeHoachNhapNguyenLieu": this.item.Id,
  };
  editTableItem: any = [];
  listLoaiBong: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {
  }

  ngOnInit(): void {
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
  }

  GhiLai() {
    if ((this.newTableItem.Container !== undefined) && (this.newTableItem.TongSoKien !== undefined) && (this.newTableItem.SoLuongNhap !== undefined)) {
      this.add();
    }
    if (this.item.listDot.length > 0) {
      this.item.listDot.filter(obj => {
        if (obj.ThoiGianDuKien !== null && obj.ThoiGianDuKien !== undefined)
          obj.ThoiGianDuKienUnix = (new Date(obj.ThoiGianDuKien)).getTime() / 1000;
        if (obj.ThoiGianCapCang !== null && obj.ThoiGianCapCang !== undefined)
          obj.ThoiGianCapCangUnix = (new Date(obj.ThoiGianCapCang)).getTime() / 1000;
      });
    }
    this.activeModal.close(
      { 
        data: this.item.listDot 
      }
    );
  }

  add() {
    if (this.item.listDot == undefined || this.item.listDot == null)
      this.item.listDot = [];
    this.newTableItem.Id = "";
    this.newTableItem.idKeHoachNhapNguyenLieu = this.item.Id;
    this.item.listDot.push(this.newTableItem);
    this.newTableItem = {
      "Id": "",
      "idKeHoachNhapNguyenLieu": this.item.Id,
    }
  }
  
  Onclose() {
    this.activeModal.dismiss();
  }
  
}
