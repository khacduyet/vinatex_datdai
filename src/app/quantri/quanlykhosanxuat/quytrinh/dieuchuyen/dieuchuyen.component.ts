import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DieuchuyenmodalComponent } from '../dieuchuyenmodal/dieuchuyenmodal.component';

@Component({
  selector: 'app-dieuchuyen',
  templateUrl: './dieuchuyen.component.html',
  styleUrls: ['./dieuchuyen.component.css']
})
export class DieuchuyenComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PKK_0000_0000'}];
  filter:any={};
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Kho điều chuyển',
      field: 'TendmKho',
      width: '150px'
    },
    {
      header: 'Kho nhập',
      field: 'TendmKhoKhac',
      width: '150px'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: '150px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '150px'
    }
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  listdmKho : any = [];

  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0'){
        this.update(res.id);
      }
    })
    this.KiemTraTabTrangThai();
    this.getListdmkho();
    this.GetListQuyTrinh()
  }
  changeParam(id){
    if(this._modal.hasOpenModals()){
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/khobong/dieuchuyen/${id}`],{replaceUrl: true})
  }
  add(){
    this.changeParam(0);
    let modalRef = this._modal.open(DieuchuyenmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {};
    modalRef.componentInstance.listdmKho = this.listdmKho;
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(Id){
    this.changeParam(Id);
    this._service.PhieuDieuChuyen().Get(Id).subscribe((res1: any) => {
    let modalRef = this._modal.open(DieuchuyenmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
    modalRef.componentInstance.listdmKho = this.listdmKho;
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  })
}
  changeTab(e){
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event){
    // this.paging.CurrentPage = event.page + 1;
    // this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?){
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data={
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this._service.PhieuDieuChuyen().GetList(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai(){
    // this._service.KiemTraButtonThemMoi().subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetListQuyTrinh();
    // })
  }
  getListdmkho(){
    let data: any = {};
    data.CurrentPage = 0;
    data.Loai = 2;
     this._service.GetListdmKho(data).subscribe((res:any)=>{
      this.listdmKho =  mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  
}
