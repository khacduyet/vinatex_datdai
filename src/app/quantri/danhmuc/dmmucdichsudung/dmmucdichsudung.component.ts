import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModaldanhmucchungComponent } from '../modal/modaldanhmucchung/modaldanhmucchung.component';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';

@Component({
  selector: 'app-dmmucdichsudung',
  templateUrl: './dmmucdichsudung.component.html',
  styleUrls: ['./dmmucdichsudung.component.css']
})
export class DmmucdichsudungComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
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
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmMucDichSuDung();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmMucDichSuDung()
  }
  GetListdmMucDichSuDung(reset?){
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
    this._services.GetListdmMucDichSuDung(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmucchungComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'mucdich';
    modalRef.componentInstance.title = 'Thêm mới danh mục mục đích sử dụng';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmMucDichSuDung()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucchungComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục mục đích sử dụng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'mucdich';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmMucDichSuDung()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmMucDichSuDung(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmMucDichSuDung();
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
      this._services.DeletedmMucDichSuDung(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmMucDichSuDung();
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
    this.GetListdmMucDichSuDung();
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'MucDichSuDung';
    modalRef.result.then(res=>{
      this.GetListdmMucDichSuDung();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
