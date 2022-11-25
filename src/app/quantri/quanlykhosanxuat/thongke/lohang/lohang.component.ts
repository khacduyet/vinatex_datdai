import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { LohangmodalComponent } from '../lohangmodal/lohangmodal.component';

@Component({
  selector: 'app-lohang',
  templateUrl: './lohang.component.html',
  styleUrls: ['./lohang.component.css']
})
export class LohangComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '150px'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '150px'
    },
    {
      header: 'Ngày',
      field: 'Ngay',
      width: '150px',
      type:'date'
    },
    {
      header: 'Giao kế hoạch sản xuất',
      field: 'TenGiaoKeHoachSanXuat',
      width: '200px'
    },
    {
      header: 'Giao kế hoạch sản xuất triển khai',
      field: 'TenGiaoKeHoachSanXuat_TrienKhai',
      width: '200px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    },
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};

  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.GetListQuyTrinh()
  }
  add(){
    let modalRef = this._modal.open(LohangmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
  }
  update(Id){
    this._service.LoHang().Get(Id).subscribe((res1: any) => {
    let modalRef = this._modal.open(LohangmodalComponent, {
      size: 'lg',
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
  delete(Id){
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa?"
    modalRef.result.then(res => {
      this._service.LoHang().Delete(Id).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.GetListQuyTrinh();
          this._toastr.success(res.message);
        } else {
          this._toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
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
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this._service.LoHang().GetList(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
}
