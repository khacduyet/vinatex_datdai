import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { KiemkebcpmodalComponent } from '../kiemkebcpmodal/kiemkebcpmodal.component';

@Component({
  selector: 'app-kiemkebcp',
  templateUrl: './kiemkebcp.component.html',
  styleUrls: ['./kiemkebcp.component.css']
})
export class KiemkebcpComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PKK_0000_0000'}];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Tổng KL',
      field: 'TendmKho',
      width: '200px'
    },
    {
      header: 'Quy PE',
      field: 'NoiDung',
      width: '200px'
    },
    {
      header: 'Quy CD',
      field: 'GhiChu',
      width: '200px'
    },
    {
      header: 'Quy CM',
      field: 'TenTrangThai',
      width: '150px'
    },
    //
    {
      header: 'Tổng KL',
      field: 'TendmKho',
      width: '200px'
    },
    {
      header: 'Quy PE',
      field: 'NoiDung',
      width: '200px'
    },
    {
      header: 'Quy CD',
      field: 'GhiChu',
      width: '200px'
    },
    {
      header: 'Quy CM',
      field: 'TenTrangThai',
      width: '150px'
    },
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  title: any = '';
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res:any)=>{
      this.title = res.kho;
      if(res.id!=='0'){
        let getitem =()=>{return{}};
        this.update(getitem());
      }
      this.GetListQuyTrinh()
    })
    this.KiemTraTabTrangThai();
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/kiemkeBCP/${id}`], { replaceUrl: true })
  }
  add(){
    this.changeParam(0);
    let modalRef = this._modal.open(KiemkebcpmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(item){
    this.changeParam(item);

    let modalRef = this._modal.open(KiemkebcpmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.title = this.title;
    modalRef.result.then((res: any) => {
      console.log(res);
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  changeTab(e){
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?){
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data: any={
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this._service.PhieuKiemKeBanChePham().GetList(data).subscribe((res:any)=>{
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
}
