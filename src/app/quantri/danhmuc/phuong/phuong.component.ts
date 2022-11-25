import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModalphuongComponent } from '../modal/modalphuong/modalphuong.component';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';

@Component({
  selector: 'app-phuong',
  templateUrl: './phuong.component.html',
  styleUrls: ['./phuong.component.css']
})
export class PhuongComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  listTinh: any = [];
  tempTinh: any;
  listQuan: any = [];
  tempQuan: any;
  items: any = [
  ];
  keyWord: any = '';
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
  selectedItems: any = [];

  constructor(private _modal: NgbModal, private _services: Dat09Service, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListdmTinh();
    this.loadPhuong(null);
  }
  GetListdmTinh() {
    let data = {
      PageSize: 0,
      CurrentPage: 0,
      sFilter: '',
    };
    this._services.GetListdmTinh(data).subscribe((res: any) => {
      this.listTinh = res;
    })
  }
  resetFilter() {
    this.tempQuan = undefined;
    this.tempTinh = null;
    this.keyWord = '';
    this.loadPhuong(null);

  }
  loadQuan(event) {
    this.tempQuan = null;
    this.items = [];
    this.paging = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
    let data = {
      PageSize: 0,
      CurrentPage: 0,
      IDdmTinh: event.value.ID,
    };
    this._services.GetListdmQuan(data).subscribe((res: any) => {
      this.listQuan = res;
    })
  }
  loadPhuong(event) {
    let data
    if (event !== null) {
      data = {
        PageSize: 20,
        CurrentPage: this.paging.CurrentPage,
        IDdmQuan: event.value.ID,
        sFilter: this.keyWord,
      };
    }else{
      data = {
        PageSize: 20,
        CurrentPage: this.paging.CurrentPage,
        sFilter: this.keyWord,
        IDdmQuan: this.tempQuan?.ID||0,
      };
    }
    this._services.GetListdmPhuong(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add() {
    let modalRef = this._modal.open(ModalphuongComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.title = 'Thêm mới danh mục phường / xã';
    modalRef.componentInstance.item.IDdmQuan = this.tempQuan.ID;
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.loadPhuong({ value: { ID: this.tempQuan.ID } })
    }).catch(er => console.log(er))
  }
  edit(item) {
    let modalRef = this._modal.open(ModalphuongComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục phường / xã';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.loadPhuong({ value: { ID: this.tempQuan.ID } })
    }).catch(er => console.log(er))
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.DeletedmPhuong(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.loadPhuong({ value: { ID: this.tempQuan.ID } });
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  deleteAll() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.DeletedmPhuong(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.loadPhuong({ value: { ID: this.tempQuan.ID } });
            this.selectedItems = [];
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.loadPhuong({ value: { ID: this.tempQuan?.ID|0 } })
  }
  enter(reset?){
    if(reset){
      this.paginator.changePage(0);
      this.paging.CurrentPage = 1;
    }
    if(this.tempQuan!==undefined){
      this.loadPhuong({ value: { ID: this.tempQuan?.ID|0 } })
    }else{
      this.loadPhuong(null);
    }
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'Phuong';
    modalRef.result.then(res=>{
      this.loadPhuong({ value: { ID: this.tempQuan?.ID|0 } })
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}
