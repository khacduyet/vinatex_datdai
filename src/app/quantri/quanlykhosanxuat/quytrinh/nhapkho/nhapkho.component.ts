import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/internal/operators/filter';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { NhapkhomodalComponent } from '../nhapkhomodal/nhapkhomodal.component';

@Component({
  selector: 'app-nhapkho',
  templateUrl: './nhapkho.component.html',
  styleUrls: ['./nhapkho.component.css']
})
export class NhapkhoComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "PHIEUNHAPLOBONG";
  cols: any = [
    {
      header: 'Số quy trình',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Số hợp đồng',
      field: 'SoHopDong',
      width: 'unset'
    },
    {
      header: 'Lô bông',
      field: 'TenLoBong',
      width: 'unset'
    },
    {
      header: 'Loại bông',
      field: 'TendmLoaiBong',
      width: 'unset'
    },
  ];
  
  colXos: any = [
    {
      header: 'Số quy trình',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Số hợp đồng',
      field: 'SoHopDong',
      width: 'unset'
    },
    {
      header: 'Lô xơ',
      field: 'TenLoBong',
      width: 'unset'
    },
    {
      header: 'Loại xơ',
      field: 'TendmLoaiBong',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  title: any = "";
  type: any = "";
  nametype: any = "";
  isCheckModal : any = false;
  constructor(public _modal: NgbModal, public _toastr: ToastrService, 
    private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) {
     }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res:any)=>{
      this.title = res.kho;
      // console.log(res.id)
      if(res.id!=='0' && this.isCheckModal == false){
        this.update(res.id);
      }
      // else
        // this.GetListQuyTrinh();
      //
      
      if(this.title === 'khobong'){
        this.type = 'bong';
        this.nametype = 'bông';
      }
      else if(this.title === 'khoxo'){
        this.type = 'xo';
        this.nametype = 'xơ';
      }
    })
    this.KiemTraTabTrangThai();
  }
  
  changeParam(id) {
    if(this._modal.hasOpenModals()){
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/${this.title}/nhapkho/${id}`], { replaceUrl: true })
  }
  
  addPhieu() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = this.type;
    modalRef.componentInstance.nametype = this.nametype;
    
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
 
  update(Id) {
    this.isCheckModal = true
    this.changeParam(Id);
    this._service.QuyTrinhPhieuNhapLoBong().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(NhapkhomodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.componentInstance.type = this.type;
      modalRef.componentInstance.nametype = this.nametype;
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
    // this.paging.CurrentPage = event.page + 1;
    // this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data: any = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: (new Date(this.filter.TuNgay).getTime() / 1000) || 0,
      DenNgay: (new Date(this.filter.DenNgay).getTime() / 1000) || 0,
      Ma: "",
      Ten: "",
    }
    if(this.title === 'khobong'){
      data.Loai = 2;
    }
    else if(this.title === 'khoxo'){
      data.Loai = 5;
    }

    this._service.QuyTrinhPhieuNhapLoBong().GetList(data).subscribe((res: any) => {
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
