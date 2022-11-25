import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kehoachnhapnguyenlieuinvoicemodal',
  templateUrl: './kehoachnhapnguyenlieuinvoicemodal.component.html',
  styleUrls: ['./kehoachnhapnguyenlieuinvoicemodal.component.css']
})
export class KehoachnhapnguyenlieuinvoicemodalComponent implements OnInit {

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
    "IdKeHoachNhapNguyenLieu_Item": this.item.Id,
  };
  editTableItem: any = [];
  listKho: any = [];
  listKeHoachNguyenLieuFull: any = [];
  listKeHoachNguyenLieu: any = [];
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
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    else {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKien = new Date(obj.ThoiGianDuKienUnix * 1000);
          obj.ThoiGianCapCang = new Date(obj.ThoiGianCapCangUnix * 1000);
        });
      }
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
    if (this.item.ThoiGianCapCangUnix !== null && this.item.ThoiGianCapCangUnix !== undefined) {
      this.item.ThoiGianCapCang = new Date(this.item.ThoiGianCapCangUnix * 1000);
    }
    if (this.item.ThoiGianDuKienUnix !== null && this.item.ThoiGianDuKienUnix !== undefined) {
      this.item.ThoiGianDuKien = new Date(this.item.ThoiGianDuKienUnix * 1000);
    }
    this._services.NhapKeHoachNguyenLieuInvoice().KeHoachForInvoice().subscribe((res: any) => {
      this.listKeHoachNguyenLieu = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listKeHoachNguyenLieuFull =res;
    })
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }


  ChuyenTiep() {
    if ((this.newTableItem.IddmLoaiBong !== undefined) && (this.newTableItem.IddmCapBong !== undefined) && (this.newTableItem.ThoiGianDuKien !== undefined)) {
      this.add();
    }
  }
  ChuyenDuyet() {
    var isCheck: any = false;
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
      isCheck = true;
    }
    else{
        this.item.listItem.forEach(element => {
        if (element.ThoiGianDuKien === null || element.ThoiGianDuKien === undefined || element.ThoiGianCapCang === null || element.ThoiGianCapCang === undefined) {
          this.toastr.error("Bạn chưa chọn chọn thời gian dự kiến hoặc thời gian cập cảng");
          isCheck = true;
        }
      });
    }
    
    if (this.newTableItem.ThoiGianDuKien!= undefined && this.newTableItem.ThoiGianDuKien!= null
      && this.newTableItem.ThoiGianCapCang!= undefined && this.newTableItem.ThoiGianCapCang!= null
      && this.newTableItem.Container!= undefined &&
       this.newTableItem.TongSoKien!= undefined) {
      this.add();
    }
    if(isCheck ==false){
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          if (obj.ThoiGianDuKien !== null && obj.ThoiGianDuKien !== undefined)
            obj.ThoiGianDuKienUnix = (new Date(obj.ThoiGianDuKien)).getTime() / 1000;
          if (obj.ThoiGianCapCang !== null && obj.ThoiGianCapCang !== undefined)
            obj.ThoiGianCapCangUnix = (new Date(obj.ThoiGianCapCang)).getTime() / 1000;
        });
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this._services.NhapKeHoachNguyenLieuInvoice().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  KhongDuyet() {
    if ((this.newTableItem.IddmLoaiBong !== undefined) && (this.newTableItem.IddmCapBong !== undefined) && (this.newTableItem.ThoiGianDuKien !== undefined)) {
      this.add();
    }
    if (this.item.listItem.length > 0) {
      this.item.listItem.filter(obj => {
        if (obj.ThoiGianDuKien !== null && obj.ThoiGianDuKien !== undefined)
          obj.ThoiGianDuKienUnix = (new Date(obj.ThoiGianDuKien)).getTime() / 1000;
        if (obj.ThoiGianCapCang !== null && obj.ThoiGianCapCang !== undefined)
          obj.ThoiGianCapCangUnix = (new Date(obj.ThoiGianCapCang)).getTime() / 1000;
      });
    }
    if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;

    this._services.NhapKeHoachNguyenLieuInvoice().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  GetNextSoQuyTrinh() {
    this._services.NhapKeHoachNguyenLieuInvoice().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    var isCheck: any = false;
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
      isCheck = true;
    }
    else{
        this.item.listItem.forEach(element => {
        if (element.ThoiGianDuKien === null || element.ThoiGianDuKien === undefined || element.ThoiGianCapCang === null || element.ThoiGianCapCang === undefined) {
          this.toastr.error("Bạn chưa chọn chọn thời gian dự kiến hoặc thời gian cập cảng");
          isCheck = true;
        }
      });
    }
    
    if (this.newTableItem.ThoiGianDuKien!= undefined && this.newTableItem.ThoiGianDuKien!= null
      && this.newTableItem.ThoiGianCapCang!= undefined && this.newTableItem.ThoiGianCapCang!= null
      && this.newTableItem.Container!= undefined &&
       this.newTableItem.TongSoKien!= undefined) {
      this.add();
    }
    if(isCheck == false){
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          if (obj.ThoiGianDuKien !== null && obj.ThoiGianDuKien !== undefined)
            obj.ThoiGianDuKienUnix = (new Date(obj.ThoiGianDuKien)).getTime() / 1000;
          if (obj.ThoiGianCapCang !== null && obj.ThoiGianCapCang !== undefined)
            obj.ThoiGianCapCangUnix = (new Date(obj.ThoiGianCapCang)).getTime() / 1000;
        });
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this._services.NhapKeHoachNguyenLieuInvoice().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            if (this.item.ThoiGianCapCangUnix !== null && this.item.ThoiGianCapCangUnix !== undefined) {
              this.item.ThoiGianCapCang = new Date(this.item.ThoiGianCapCangUnix * 1000);
            }
            if (this.item.ThoiGianDuKienUnix !== null && this.item.ThoiGianDuKienUnix !== undefined) {
              this.item.ThoiGianDuKien = new Date(this.item.ThoiGianDuKienUnix * 1000);
            }
            this.item.listItem.filter(obj => {
              obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
              obj.ThoiGianCapCang = obj.ThoiGianCapCangUnix > 0 ? UnixToDate(obj.ThoiGianCapCangUnix) : 0;
            });
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.NhapKeHoachNguyenLieuInvoice().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  filtertable_add() {
    if (this.filter.KeyWord != undefined && this.filter.KeyWord != null && this.filter.KeyWord != "") {
      this.item.listItem_copy = deepCopy(this.item.listItem);
      let filter = this.item.listItem.filter(obj => {
        let Ten = obj.objloaibong.label.toLowerCase();
        let indexOf = Ten.indexOf(this.filter.KeyWord);
        return indexOf != -1
      });
      this.item.listItem = filter;
    }
    else {
      this.item.listItem = deepCopy(this.item.listItem_copy);
      this.item.listItem.filter(obj => {
        obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
        obj.ThoiGianCapCang = obj.ThoiGianCapCangUnix > 0 ? UnixToDate(obj.ThoiGianCapCangUnix) : 0;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }

  gettonkho(data_idKho, item) {
    let data: any = {
      idKho: validVariable(data_idKho) ? data_idKho : "",
      idNguyenLieu: validVariable(item.IddmLoaiBong) ? item.IddmLoaiBong : "",
    }
    this._services.GetOptions().GetTonKhoCuaNguyenLieu(data.idKho, data.idNguyenLieu).subscribe((res: any) => {
      item.TonKho = res.TonKho;
    })
  }

  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.newTableItem.Id = "";
    this.newTableItem.IdKeHoachNhapNguyenLieuInvoice = this.item.Id;
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {
      "Id": "",
      "IdKeHoachNhapNguyenLieuInvoice": this.item.Id,
    }
  }
  edit(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  saveEdit(item, index) {
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
  }
  cancelEdit(item, index) {
    this.item.listItem[index].editField = false;
  }
  Onclose() {
    this.activeModal.dismiss();
  }
  getKeHoachNhapNguyenLieu(){
    for(let i =0; i < this.listKeHoachNguyenLieuFull.length ; i ++){
      if(this.listKeHoachNguyenLieuFull[i].Id === this.item.IdKeHoachNhapNguyenLieu_Item)
      {
        this.item.GiaBong = this.listKeHoachNguyenLieuFull[i].GiaBong;
        this.item.SoLuongNhap = this.listKeHoachNguyenLieuFull[i].SoLuongNhap;
        this.item.Container = this.listKeHoachNguyenLieuFull[i].Container;
        this.item.ThoiGianCapCang = new Date(this.listKeHoachNguyenLieuFull[i].ThoiGianCapCangUnix * 1000);
        this.item.ThoiGianDuKien = new Date(this.listKeHoachNguyenLieuFull[i].ThoiGianDuKienUnix * 1000);
        break;
      }
    }
  }
}
