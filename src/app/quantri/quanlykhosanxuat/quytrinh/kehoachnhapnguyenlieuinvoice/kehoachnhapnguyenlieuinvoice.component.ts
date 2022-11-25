import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { KehoachnhapnguyenlieuinvoicemodalComponent } from '../kehoachnhapnguyenlieuinvoicemodal/kehoachnhapnguyenlieuinvoicemodal.component';

@Component({
  selector: 'app-kehoachnhapnguyenlieuinvoice',
  templateUrl: './kehoachnhapnguyenlieuinvoice.component.html',
  styleUrls: ['./kehoachnhapnguyenlieuinvoice.component.css']
})
export class KehoachnhapnguyenlieuinvoiceComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  listKho: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    // {
    //   header: 'Nội dung',
    //   field: 'NoiDung',
    //   width: 'unset'
    // },
    // {
    //   header: 'Khối lượng nhập (Tấn)',
    //   field: 'TongKhoiLuongNhap',
    //   width: 'unset'
    // },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: '100px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
isCheckModal: any = false;
eAction = 'KEHOACHNHAPNGUYENLIEUINVOICE'
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0' && res.id!==undefined && this.isCheckModal===false){
        this.update(res.id);
      }
    })
    this.getListKho();
    this.KiemTraTabTrangThai();
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/khobong/kehoachnhapnguyenlieuinvoice/${id}`], { replaceUrl: true })
  }
  addPhieuBong() {
    this.changeParam(0);
    let modalRef = this._modal.open(KehoachnhapnguyenlieuinvoicemodalComponent, {
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
    this.isCheckModal = true
    this.changeParam(Id);
    this._service.NhapKeHoachNguyenLieuInvoice().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(KehoachnhapnguyenlieuinvoicemodalComponent, {
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
    this._service.NhapKeHoachNguyenLieuInvoice().GetList(data).subscribe((res: any) => {
      this.items = res.items;
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
