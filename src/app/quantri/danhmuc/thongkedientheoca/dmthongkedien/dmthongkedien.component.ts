import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalquanComponent } from 'src/app/quantri/danhmuc/modal/modalquan/modalquan.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, formatdate, UnixToDate } from 'src/app/services/globalfunction';
import { DmthongkedienmodalComponent } from '../dmthongkedienmodal/dmthongkedienmodal.component';

@Component({
  selector: 'app-dmthongkedien',
  templateUrl: './dmthongkedien.component.html',
  styleUrls: ['./dmthongkedien.component.css']
})
export class DmthongkedienComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  listKho: any = [];
  listnhamay: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  userInfo: any;

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router, private _auth: AuthenticationService) {
    this.items.lstNgay = [];
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.GetDanhSachDuAnByIdUser();
    this.resetFilter();
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/theodoithongkebaocaosanxuat/thongkedien/${id}`], { replaceUrl: true })
  }

  GetDanhSachDuAnByIdUser() {
    this._service.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listnhamay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(DmthongkedienmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this._toastr.success('Cập nhật thành công');
      this.GetList();
    })
      .catch(er => { console.log(er) })
  }

  update(item) {
    this._service.ThongKeDien().Get(item).subscribe((res: any) => {
      let modalRef = this._modal.open(DmthongkedienmodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = res;
      modalRef.result.then((res: any) => {
        // this._toastr.success('Cập nhật thành công');
        this.GetList();
      })
        .catch(er => { console.log(er) })
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }

  GetList(reset?) {
    let data = {
      // PageSize: 25,
      // CurrentPage: this.paging.CurrentPage,     
      sFilter: this.filter.KeyWord,
      TuNgay: (new Date(this.filter.TuNgay).getTime() / 1000) || 0,
      DenNgay: (new Date(this.filter.DenNgay).getTime() / 1000) || 0,
      IdDuAn: this.filter.IddmItem
    }
    this._service.ThongKeDien().GetList(data).subscribe((res: any) => {
      this.items = res;
      this.items.lstNgay.forEach(element => {
        element.NgayNhap = element.NgayNhapUnix > 0 ? element.NgayNhap : null;
        // element.NgayNhap = element.NgayNhapUnix > 0 ? UnixToDate(element.NgayNhapUnix) : null;
        // element.NgayNhap = element.NgayNhapUnix > 0 ? UnixToDate(element.NgayNhapUnix) : null;
        // element.NgayNhap = element.NgayNhapUnix > 0 ? UnixToDate(element.NgayNhapUnix) : null;
      });
      // this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    let d = new Date();
    this.filter.DenNgay = new Date();
    d.setDate(this.filter.DenNgay.getDate() - 7);
    this.filter.TuNgay = d;
    this.GetList(true);
  }
  KiemTraTabTrangThai() {
    // this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetList();
    // })
  }

}
