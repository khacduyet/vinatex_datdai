import { Component, OnInit } from '@angular/core';
import { ModalcaphangcongtrinhComponent } from '../modal/modalcaphangcongtrinh/modalcaphangcongtrinh.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';

@Component({
  selector: 'app-dmcaphangcongtrinh',
  templateUrl: './dmcaphangcongtrinh.component.html',
  styleUrls: ['./dmcaphangcongtrinh.component.css']
})
export class DmcaphangcongtrinhComponent implements OnInit {
  items: any = [];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
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
    // {
    //   header: 'Ghi chú',
    //   field: 'GhiChu',
    //   width: 'unset'
    // }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmCapHangCongTrinh();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmCapHangCongTrinh()
  }
  GetListdmCapHangCongTrinh(){
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      Ma:"", 
      Ten:""
    };
    this._services.GetListdmCapHangCongTrinh(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModalcaphangcongtrinhComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.title = 'Thêm mới danh mục cấp / hạng';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmCapHangCongTrinh()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModalcaphangcongtrinhComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục cấp / hạng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmCapHangCongTrinh()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmCapHangCongTrinh(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmCapHangCongTrinh();
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
      this._services.DeletedmCapHangCongTrinh(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmCapHangCongTrinh();
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
    this.GetListdmCapHangCongTrinh();
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'CapHangCongTrinh';
    modalRef.result.then(res=>{
      this.GetListdmCapHangCongTrinh();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
