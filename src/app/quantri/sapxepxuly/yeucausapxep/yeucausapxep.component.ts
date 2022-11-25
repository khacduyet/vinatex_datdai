import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalphuongansapxepComponent } from '../modal/modalphuongansapxep/modalphuongansapxep.component';
import { API } from 'src/app/services/host';

@Component({
  selector: 'app-yeucausapxep',
  templateUrl: './yeucausapxep.component.html',
  styleUrls: ['./yeucausapxep.component.css']
})
export class YeucausapxepComponent implements OnInit {
  keyWord:any='';
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Phương án sắp xếp',
      field: 'Ten',
      width: '200px',
      class: 'text-center'
    },
    {
      header: 'Yêu cầu',
      field: 'YeuCau',
      width: '500px',
      class: ''
    },
    {
      header: 'Quy định pháp lý/Tập đoàn',
      field: 'QuyDinhPhapLy',
      width: '200px',
      class: 'text-center'
    },
    // {
    //   header: 'Hồ sơ pháp lý',
    //   field: 'TepDinhKem',
    //   width: '200px',
    //   type: 'link',
    //   class: 'text-center'
    // }
  ];
  selectedItems:any=[];

  constructor(private _modal:NgbModal,private _services:Dat09Service,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmPhuongAnSapXep()
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmPhuongAnSapXep()
  }
  GetListdmPhuongAnSapXep(){
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      Ma:"", 
      Ten:""
    };
    this._services.GetListdmPhuongAnSapXep(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModalphuongansapxepComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.title = 'Thêm mới yêu cầu sắp xếp';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmPhuongAnSapXep()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModalphuongansapxepComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật yêu cầu sắp xếp';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    console.log(item);
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmPhuongAnSapXep()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmPhuongAnSapXep(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmPhuongAnSapXep();
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
      this._services.DeletedmPhuongAnSapXep(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmPhuongAnSapXep();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmPhuongAnSapXep();
  }
  download(tepdinhkems:Array<any>){
    console.log(tepdinhkems[0])
    if(tepdinhkems[0].TenGoc.includes('.pdf')){
      window.open(API.imgURL+tepdinhkems[0].Link+'&viewOnly=true')
    }else{
      window.open(API.imgURL+tepdinhkems[0].Link);
    }
  }
}
