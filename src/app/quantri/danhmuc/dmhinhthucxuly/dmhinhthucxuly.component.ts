import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaldmhinhthucxulyComponent } from '../modal/modaldmhinhthucxuly/modaldmhinhthucxuly.component';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';

@Component({
  selector: 'app-dmhinhthucxuly',
  templateUrl: './dmhinhthucxuly.component.html',
  styleUrls: ['./dmhinhthucxuly.component.css']
})
export class DmhinhthucxulyComponent implements OnInit {
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
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
      header: 'Loại',
      field: 'Loai',
      width: '100px',
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '100px'
    }
  ];
  item:any={};
  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetItems()
  }
  GetItems(){
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.keyWord,
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmHinhThucXuLy(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.keyWord = '';
    this.GetItems()
  }
  add(){
    let modalRef = this._modal.open(ModaldmhinhthucxulyComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.item={ID:0};
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetItems()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldmhinhthucxulyComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.item=JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetItems()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message="Bạn có chắc chắn muốn xóa dữ liệu này chứ?"
    modalRef.result.then(res=>{
      this._services.DeletedmHinhThucXuLy([item]).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetItems();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetItems();
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'HinhThucXuLy';
    modalRef.result.then(res=>{
      this.GetItems();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
