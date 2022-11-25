import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, formatdate } from 'src/app/services/globalfunction';
import { KehoachxuathangmodalComponent } from '../kehoachxuathangmodal/kehoachxuathangmodal.component';

@Component({
  selector: 'app-kehoachxuathang',
  templateUrl: './kehoachxuathang.component.html',
  styleUrls: ['./kehoachxuathang.component.css']
})
export class KehoachxuathangComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  listKho: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Số phiếu',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Ngày',
      field: '_Ngay',
      width: 'unset'
    },
    {
      header: 'Nội dung',
      field: 'NoiDung',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  eAction = 	'KEHOACHXUATHANG';
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.getListKho();
    this.KiemTraTabTrangThai();
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/khothanhpham/kehoachxuathang/${id}`], { replaceUrl: true })
  }
  addPhieuBong() {
    this.changeParam(0);
    let modalRef = this._modal.open(KehoachxuathangmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  addPhieuSo() {
    this.changeParam(0);
    let modalRef = this._modal.open(KehoachxuathangmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(Id) {
    this._service.KeHoachXuatHang().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(KehoachxuathangmodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
      })
        .catch(er => { console.log(er) })
    })
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }

  getListKho() {
    let data = {
      CurrentPage: 0
    }
    this._service.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: (new Date(this.filter.TuNgay).getTime() / 1000) || 0,
      DenNgay: (new Date(this.filter.DenNgay).getTime() / 1000) || 0,
      Ma: "",
      Ten: "",
    }
    this._service.KeHoachXuatHang().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      if (this.items.length > 0) {
        this.items.forEach(element => {
          element._Ngay = element.NgayUnix > 0 ? formatdate(element.Ngay, false) : null;
          this.listKho.filter(obj => {
            if (element.idKhoXuat == obj.value) {
              element.TenKho = obj.label;
            }
          });
        });
      }
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
}
