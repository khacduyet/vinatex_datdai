import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModaldanhmucchungComponent } from '../modal/modaldanhmucchung/modaldanhmucchung.component';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';

@Component({
  selector: 'app-tinhtrangtaisan',
  templateUrl: './tinhtrangtaisan.component.html',
  styleUrls: ['./tinhtrangtaisan.component.css']
})
export class TinhtrangtaisanComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '200px',
      align:'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '300px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmTinhTrangTaiSan();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmTinhTrangTaiSan()
  }
  GetListdmTinhTrangTaiSan(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      Ma:"", 
      Ten:""
    };
    this._services.GetListdmTinhTrangTaiSan(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmucchungComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'tinhtrangtaisan';
    modalRef.componentInstance.title = 'Thêm mới danh mục tình trạng tài sản';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmTinhTrangTaiSan()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucchungComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục tình trạng tài sản';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'tinhtrangtaisan';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmTinhTrangTaiSan()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmTinhTrangTaiSan([item]).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmTinhTrangTaiSan();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  deleteAll(){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmTinhTrangTaiSan(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmTinhTrangTaiSan();
            this.selectedItems = [];
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmTinhTrangTaiSan()
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'TinhTrangTaiSan';
    modalRef.result.then(res=>{
      this.GetListdmTinhTrangTaiSan();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
