import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ModaldmtaisanComponent } from '../modal/modaldmtaisan/modaldmtaisan.component';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';

@Component({
  selector: 'app-dmtaisan',
  templateUrl: './dmtaisan.component.html',
  styleUrls: ['./dmtaisan.component.css']
})
export class DmtaisanComponent implements OnInit {
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
    // {
    //   header: 'Năm khấu hao',
    //   field: 'NamKhauHao',
    //   width: '200px'
    // },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmTaiSan();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmTaiSan()
  }
  GetListdmTaiSan(reset?){
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
    this._services.GetListdmTaiSan(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldmtaisanComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmTaiSan()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldmtaisanComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmTaiSan()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmTaiSan([item]).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmTaiSan();
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
      this._services.DeletedmTaiSan(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmTaiSan();
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
    this.GetListdmTaiSan();
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'TaiSan';
    modalRef.result.then(res=>{
      this.GetListdmTaiSan();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
