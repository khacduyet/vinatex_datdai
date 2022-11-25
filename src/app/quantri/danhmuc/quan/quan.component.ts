import { Component, OnInit } from '@angular/core';
import { Dat09Service } from 'src/app/services/callApi';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalquanComponent } from '../modal/modalquan/modalquan.component';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';

@Component({
  selector: 'app-quan',
  templateUrl: './quan.component.html',
  styleUrls: ['./quan.component.css']
})
export class QuanComponent implements OnInit {
  listTinh:any=[];
  tempTinh:any;
  items: any = [
  ];
  keyWord:any='';
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
  GetListdmTinh(){
    let data = {
      PageSize:0, 
      CurrentPage:0,
      sFilter:'',  
    };
    this._services.GetListdmTinh(data).subscribe((res:any)=>{
      this.listTinh = res;
    })
  }
  resetFilter(){
    this.keyWord = '';
    this.loadQuan();
  }
  loadQuan(){
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,
      IDdmTinh:this.tempTinh.ID,
      Ma:"", 
      Ten:""
    };
    this._services.GetListdmQuan(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModalquanComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.title = 'Thêm mới danh mục quận / huyện';
    modalRef.componentInstance.item.IDdmTinh = this.tempTinh.ID;
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.loadQuan()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModalquanComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục quận / huyện';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.loadQuan()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmQuan(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.loadQuan();
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
      this._services.DeletedmQuan(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.loadQuan();
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
    this.loadQuan()
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'Quan';
    modalRef.result.then(res=>{
      this.loadQuan();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
