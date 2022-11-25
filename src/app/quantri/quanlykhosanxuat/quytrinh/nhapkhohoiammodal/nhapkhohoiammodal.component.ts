import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-nhapkhohoiammodal',
  templateUrl: './nhapkhohoiammodal.component.html',
  styleUrls: ['./nhapkhohoiammodal.component.css']
})
export class NhapkhohoiammodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  editTableItem: any = [];
  listPhanXuong: any = [];
  listCaMay: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  checkedAll: boolean = false;
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Tên lô hàng',
      field: 'TenLoHang',
      width: 'unset'
    },
    {
      header: 'Số lượng sản xuất',
      field: 'KhoiLuongSanXuat',
      width: 'unset'
    },
    {
      header: 'Số lượng thực tế',
      field: 'KhoiLuongThucTe',
      width: 'unset'
    },
  ];
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
    else{
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
    this.data.CurrentPage = 0;
    this.getListKho();
    this.getListCaMay();
    this.getListPhanXuong();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenTiep() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      if (this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined && this.newTableItem.ViTri!= undefined) {
        this.add();
      }
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this.item.listItem.forEach(element => {
        element.IddmKho = this.item.IddmKho
      });
      this._services.PhieuNhapHoiAm().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            // this.activeModal.close();
            this.Onclose();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuNhapHoiAm().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      if (this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined && this.newTableItem.ViTri!= undefined) {
        this.add();
      }
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this.item.listItem.forEach(element => {
        element.IddmKho = this.item.IddmKho
      });
      this._services.PhieuNhapHoiAm().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
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
      this._services.PhieuNhapHoiAm().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListKho() {
    this.data.Loai = 10;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCaMay() {
    this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaMay = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetMatHangTheoKho() {
    let itemSearch: any = {};
    itemSearch.IddmCaSanXuat = this.item.IddmCaSanXuat;
    if(this.item.Ngay !== undefined)
      itemSearch.Ngay = (new Date(this.item.Ngay)).getTime() / 1000;
    itemSearch.IddmPhanXuong = this.item.IddmPhanXuong;
    this._services.PhieuNhapHoiAm().GetListMatHang(itemSearch).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        backdrop: 'static',
        size: 'lg',
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.listItem;
      modalRef.componentInstance.cols= this.cols;
      modalRef.result.then((data) => {
        this.item.listItem.forEach(element => {
          element.isXoa = true;
        });
        this.item.listItem.push(data.data);
      }, (reason) => {
        // không
      });
    })
  }
  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {}
  }
  
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  Onclose() {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    // this.activeModal.close();
  }
}
