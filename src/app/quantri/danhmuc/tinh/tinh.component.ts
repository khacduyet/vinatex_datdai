import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModaltinhComponent } from '../modal/modaltinh/modaltinh.component';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';

@Component({
  selector: 'app-tinh',
  templateUrl: './tinh.component.html',
  styleUrls: ['./tinh.component.css']
})
export class TinhComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  keyWord:any='';
  first:any = 0;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '200px'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '300px'
    },
    // {
    //   header: 'Ghi chú',
    //   field: 'GhiChu',
    //   width: 'unset'
    // }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmTinh();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmTinh()
  }
  GetListdmTinh(reset?){
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
    this._services.GetListdmTinh(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaltinhComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.title = 'Thêm mới danh mục tỉnh';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmTinh()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaltinhComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục tỉnh';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmTinh()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmTinh(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmTinh();
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
      this._services.DeletedmTinh(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmTinh();
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
    this.GetListdmTinh();
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'Tinh';
    modalRef.result.then(res=>{
      this.GetListdmTinh();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
