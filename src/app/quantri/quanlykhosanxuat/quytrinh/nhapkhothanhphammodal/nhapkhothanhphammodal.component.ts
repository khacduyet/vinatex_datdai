import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-nhapkhothanhphammodal',
  templateUrl: './nhapkhothanhphammodal.component.html',
  styleUrls: ['./nhapkhothanhphammodal.component.css']
})
export class NhapkhothanhphammodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  listLoaiBong: any = [];
  listKhoHoiAm: any = [];
  listKhoThanhPham: any = [];
  // listdmQuyCachDongGoi: any = [];
  lang: any = vn;
  data: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  // listMucDich: any = [
  //   { value: 0, label: 'Xuất khẩu' },
  //   { value: 1, label: 'Nội địa' },
  // ]
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
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this._services.PhieuNhapThanhPham().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuNhapThanhPham().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this._services.PhieuNhapThanhPham().Set(this.item).subscribe((res: any) => {
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
      this._services.PhieuNhapThanhPham().Delete(this.item).subscribe((res: any) => {
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
      this.listKhoHoiAm = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.data.Loai = 11;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKhoThanhPham = mapArrayForDropDown(res, 'Ten', 'Id');
    })
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
    this.activeModal.close();
  }
  GetMatHangTheoKho() {
    var data = {
      Ngay: new Date(this.item.Ngay).getTime() / 1000,
      IddmKho: this.item.IddmKhoHoiAm,
    }
    this._services.GetlistdmMatHangThanhPham(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.listItem;
      modalRef.result.then((data) => {
        
        this.item.listItem = data.data;
        this.item.listItem.forEach(element => {
          element.Id = "";
          element.SoQuaSoiHoiAm = element.Ton;
          element.SoQuaSoiThanhPham = element.Ton;
          element.KgCone = element.TrongLuong;
          element.IddmKho = this.item.IddmKhoThanhPham;
        });
      }, (reason) => {
        // không
      });
    })
  }
}
