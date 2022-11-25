import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { congDoan } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { ImportdanhmucmodelComponent } from '../modals/importdanhmucmodel/importdanhmucmodel.component';
import { MathangmodelComponent } from '../modals/mathangmodel/mathangmodel.component';

@Component({
  selector: 'app-mathang',
  templateUrl: './mathang.component.html',
  styleUrls: ['./mathang.component.css']
})
export class MathangComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  filter:any={
  };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '100px',
      align:'center'
    },
    {
      header: 'Tên mặt hàng',
      field: 'Ten',
      width: '200px',
      align:'center'
    },
    {
      header: 'Loại sợi',
      field: 'TendmLoaiSoi',
      width: '200px',
      align:'center'
    },
    {
      header: 'Đơn vị tính',
      field: 'DonViDatHang',
      width: '100px',
      align:'center'
    },
    {
      header: 'Đặc tính sợi',
      field: 'DacTinhSoi',
      width: '100px',
      align:'center'
    },
    // {
    //   header: 'Chi số Ne',
    //   field: 'Ne',
    //   width: '100px',
    //   align:'center'
    // },
    // {
    //   header: 'Chi số mét Nm',
    //   field: 'Nm',
    //   width: '100px',
    //   align:'center'
    // },
    // {
    //   header: 'Độ săn',
    //   field: 'DoSan',
    //   width: '100px',
    //   align:'center'
    // },
    
    // {
    //   header: 'Ghi chú',
    //   field: 'GhiChu',
    //   width: 'unset',
    //   center:'center'
    // }
  ];
  listdmLoaiSoi:any = [];
  listCongDoan : any = [];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,
    private _services:SanXuatService,
    private _toastr:ToastrService) 
    { }

  ngOnInit(): void {
    this.GetListdm();
    this.GetListdmLoaiSoi();
    this.getListCongDoan();
  }
  resetFilter(){
    this.filter = {
    };
    this.GetListdm()
  }
  GetListdmLoaiSoi(){
    this._services.GetListOptdmLoaiSoi().subscribe((res:any)=>{
      this.listdmLoaiSoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListdm(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.filter.keyWord?this.filter.keyWord:'',
      IddmLoaiSoi:this.filter.IddmLoaiSoi?this.filter.IddmLoaiSoi:'',
      Ma:"", 
      Ten:"",
      Loai:"1",
      HoatDong:2,
    };
    this._services.GetListdmItem(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(MathangmodelComponent,{
      size:'lg',
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.listCongDoan = this.listCongDoan;

    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(MathangmodelComponent,{
      size:'lg',
      backdrop:'static'
    });
    item.listCongDoan = ['ONG']
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.listCongDoan = this.listCongDoan;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    let itemDel : any = {};
    itemDel.Id = item.Id;
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{

      this._services.DeletedmItem(itemDel).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdm();
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
      this._services.DeletedmItem(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdm();
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
    this.GetListdm();
  }
  importExcel(){
    let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'SCM_dmItem';
    modalRef.result.then(res=>{
      this.GetListdm();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
  exportExcel(){
    let data = {
      PageSize:20, 
      CurrentPage:0,
      sFilter:this.filter.keyWord?this.filter.keyWord:'',
      IddmLoaiSoi:this.filter.IddmLoaiSoi?this.filter.IddmLoaiSoi:'',
      Ma:"", 
      Ten:"",
      Loai:"1",
      TableName:'SCM_dmItem'
    };
    this._services.Exportdm(data).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
  getListCongDoan(){
    this._services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
}
