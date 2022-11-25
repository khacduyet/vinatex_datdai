import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { formatdate } from 'src/app/services/globalfunction';
import { NhapkhothanhphammodalComponent } from '../nhapkhothanhphammodal/nhapkhothanhphammodal.component';

@Component({
  selector: 'app-nhapkhothanhpham',
  templateUrl: './nhapkhothanhpham.component.html',
  styleUrls: ['./nhapkhothanhpham.component.css']
})
export class NhapkhothanhphamComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "PHIEUNHAPTHANHPHAM";
  cols: any = [
    // {
    //   header: 'Số quy trình',
    //   field: 'SoQuyTrinh',
    //   width: 'unset'
    // },
    // {
    //   header: 'Ngày chứng từ',
    //   field: '_Ngay',
    //   width: 'unset'
    // },
    {
      header: 'Tên kho',
      field: 'TendmKho',
      width: 'unset'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res:any)=>{
      console.log(res.id)
      if(res.id!=='0'){
        this.update(res.id);
      }
      // else
        this.GetListQuyTrinh();
      this.KiemTraTabTrangThai();
      //
    })
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlysanxuatkhothanhpham/khothanhpham/nhapkho/${id}`], { replaceUrl: true })
  }
  addPhieuBong() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapkhothanhphammodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'bong';
    modalRef.componentInstance.nametype = 'kho thành phẩm';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(Id) {
    this.changeParam(Id);
    this._service.PhieuNhapThanhPham().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(NhapkhothanhphammodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.nametype = 'kho thành phẩm';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
      })
        .catch(er => { console.log(er) })
    })
  }
  changeTab(e) {
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
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
    this._service.PhieuNhapThanhPham().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
      // if (this.items.length > 0) {
      //   this.items.forEach(element => {
      //     element._Ngay = element.NgayUnix > 0 ? formatdate(element.Ngay, false) : null;
      //   });
      // }
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    // this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetListQuyTrinh();
    // })
  }

}
