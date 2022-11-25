import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from 'src/app/quantri/modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ImportdanhmucmodelComponent } from '../danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModaldanhmucchungComponent } from '../modal/modaldanhmucchung/modaldanhmucchung.component';

@Component({
  selector: 'app-quycachdonggoi',
  templateUrl: './quycachdonggoi.component.html',
  styleUrls: ['./quycachdonggoi.component.css']
})
export class QuycachdonggoiComponent implements OnInit {

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
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      align:'center'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService,private ServicesSanXuat: SanXuatService) { }

  ngOnInit(): void {
    this.GetDanhSach();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetDanhSach()
  }
  GetDanhSach(reset?){
    // if(reset){
    //   this.paging.CurrentPage=1;
    //   this.paginator.changePage(0);
    // }
    // let data = {
    //   PageSize:20, 
    //   CurrentPage:this.paging.CurrentPage,
    //   sFilter:this.keyWord,  
    //   Ma:"", 
    //   Ten:""
    // };
    this.ServicesSanXuat.dmQuyCachDongGoi().GetList().subscribe((res:any)=>{
      this.items = res;
      // this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmucchungComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'quycachdonggoi';
    modalRef.componentInstance.title = 'Thêm mới danh mục nhóm công tơ';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetDanhSach()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucchungComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục nhóm công tơ';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'quycachdonggoi';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetDanhSach()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this.ServicesSanXuat.dmQuyCachDongGoi().Delete(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetDanhSach();
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
      this.ServicesSanXuat.dmNhomCongToDien().Delete(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetDanhSach();
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
    this.GetDanhSach();
  }
  importExcel(){
    // let modalRef = this._modal.open(ModalimportexcelComponent,{
    //   backdrop:'static',
    // })
    // modalRef.componentInstance.importFunc = 'BienDong';
    // modalRef.result.then(res=>{
    //   this.GetDanhSach();
    //   this._toastr.success(res.mess);
    // })
    // .catch(er=>console.log(er))
  }
  exportExcel(){
    
  }

}
