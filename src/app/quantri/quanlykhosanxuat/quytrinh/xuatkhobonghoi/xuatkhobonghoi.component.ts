import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { XuatkhobonghoimodalComponent } from '../xuatkhobonghoimodal/xuatkhobonghoimodal.component';

@Component({
  selector: 'app-xuatkhobonghoi',
  templateUrl: './xuatkhobonghoi.component.html',
  styleUrls: ['./xuatkhobonghoi.component.css']
})
export class XuatkhobonghoiComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PKK_0000_0000'}];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Tên kho xuất',
      field: 'TendmKho',
      width: 'unset'
    },
    {
      header: 'Tên phân xưởng',
      field: 'TendmPhanXuong',
      width: 'unset'
    },
    {
      header: 'Phương án pha bông',
      field: 'TenPhuongAnPhaBong',
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
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0' && res.id!==undefined){
        this.update(res.id);
      }
    })
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()

  }
  changeParam(id){
    this.router.navigate([`quantri/quanlykhosanxuat/khobonghoi/xuatkho/${id}`],{replaceUrl: true})
  }
  add(){
    this.changeParam(0);
    let modalRef = this._modal.open(XuatkhobonghoimodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {};
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(item){
    this.changeParam(item.Id);
    let modalRef = this._modal.open(XuatkhobonghoimodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
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
    let data={
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      Loai:"6"
    }
    this._service.PhieuXuatSanXuat().GetList(data).subscribe((res:any)=>{
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
