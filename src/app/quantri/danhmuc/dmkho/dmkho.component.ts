import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ImportdanhmucmodelComponent } from '../danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModaldanhmucchungComponent } from '../modal/modaldanhmucchung/modaldanhmucchung.component';
import { ModaldmkhoComponent } from '../modal/modaldmkho/modaldmkho.component';

@Component({
  selector: 'app-dmkho',
  templateUrl: './dmkho.component.html',
  styleUrls: ['./dmkho.component.css']
})
export class DmkhoComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
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
      width: '300px',
      center:'left'
    },
    {
      header: 'Tên nhóm kho',
      field: 'TendmNhomKho',
      width: '300px',
      center:'left'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      center:'center'
    }
  ];
  selectedItems:any=[];
  listdmNhomKho : any = [];
  IddmNhomKho: any = '';
  constructor(private _modal:NgbModal,private _services:SanXuatService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListDanhMuc();
    this.GetListNhomKho();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListDanhMuc()
  }
  GetListDanhMuc(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      IddmNhomKho:this.IddmNhomKho,  
      Ma:"", 
      Ten:""
    };
    this._services.GetListdmKho(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldmkhoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'dmkho';
    modalRef.componentInstance.title = 'Thêm mới danh mục kho';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListDanhMuc()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldmkhoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục kho';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'dmkho';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListDanhMuc()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmKho([item]).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListDanhMuc();
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
      this._services.DeletedmKho(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListDanhMuc();
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
    this.GetListDanhMuc();
  }
  importExcel(){
    let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'SCM_dmKho';
    modalRef.result.then(res=>{
      this.GetListDanhMuc();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
  exportExcel(){
    let dataSearch: any = {}
    dataSearch.TableName = 'SCM_dmKho';
    dataSearch.CurrentPage = 0;
    this._services.Exportdm(dataSearch).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
  GetListNhomKho(){
    let data = {
      CurrentPage:0,
    };
    this._services.GetListdmNhomKho(data).subscribe((res:any)=>{
      this.listdmNhomKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
}
