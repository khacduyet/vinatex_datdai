import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { VitrimodalComponent } from '../../modal/vitrimodal/vitrimodal.component';
import { ImportdanhmucmodelComponent } from '../modals/importdanhmucmodel/importdanhmucmodel.component';

@Component({
  selector: 'app-vitri',
  templateUrl: './vitri.component.html',
  styleUrls: ['./vitri.component.css']
})
export class VitriComponent implements OnInit {

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
      width: '200px',
      align:'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '200px',
      align:'center'
    },
    {
      header: 'Tên danh mục kho',
      field: 'TendmKho',
      width: '200px',
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      center:'center'
    }
  ];
  listCongDoan:any = [];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,
    private _services:SanXuatService,
    private _toastr:ToastrService) 
    { }

  ngOnInit(): void {
    this.GetListdm();
  }
  resetFilter(){
    this.filter = {
    };
    this.GetListdm()
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
      CongDoan:this.filter.CongDoan?this.filter.CongDoan:'',
      Ma:"", 
      Ten:"",
    };
    this._services.GetListdmViTri(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(VitrimodalComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.result.then(res=>{
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(VitrimodalComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
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

      this._services.DeletedmViTri(itemDel).subscribe((res: any) => {
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
      this._services.DeletedmViTri(this.selectedItems).subscribe((res: any) => {
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
    modalRef.componentInstance.importFunc = 'SCM_dmViTri';
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
      TableName:'SCM_dmViTri'
    };
    this._services.Exportdm(data).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
}
