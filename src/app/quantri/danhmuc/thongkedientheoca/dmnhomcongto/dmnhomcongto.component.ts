import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModaldanhmucchungComponent } from '../../modal/modaldanhmucchung/modaldanhmucchung.component';
import { ModalthongbaoComponent } from '../../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../../modal/modalimportexcel/modalimportexcel.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-dmnhomcongto',
  templateUrl: './dmnhomcongto.component.html',
  styleUrls: ['./dmnhomcongto.component.css']
})
export class DmnhomcongtoComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset',
      center: 'left'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      center: 'center'
    }
  ];
  selectedItems: any = [];
  constructor(private _modal: NgbModal, private _services: Dat09Service, private _toastr: ToastrService, private ServicesSanXuat: SanXuatService) { }

  ngOnInit(): void {
    this.GetDanhSachNhomCongToDien();
  }
  resetFilter() {
    this.keyWord = '';
    this.GetDanhSachNhomCongToDien()
  }
  GetDanhSachNhomCongToDien(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.keyWord,
    };
    this.ServicesSanXuat.dmNhomCongToDien().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add() {
    let modalRef = this._modal.open(ModaldanhmucchungComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'nhomcongto';
    modalRef.componentInstance.title = 'Thêm mới danh mục nhóm công tơ';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetDanhSachNhomCongToDien()
    }).catch(er => console.log(er))
  }
  edit(item) {
    let modalRef = this._modal.open(ModaldanhmucchungComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục nhóm công tơ';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'nhomcongto';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetDanhSachNhomCongToDien()
    }).catch(er => console.log(er))
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.ServicesSanXuat.dmNhomCongToDien().Delete(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetDanhSachNhomCongToDien();
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
      this.ServicesSanXuat.dmNhomCongToDien().Delete(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetDanhSachNhomCongToDien();
            this.selectedItems = [];
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  // changePage(event){
  //   this.paging.CurrentPage = event.page+1;
  //   this.GetDanhSachNhomCongToDien();
  // }
  importExcel() {
    // let modalRef = this._modal.open(ModalimportexcelComponent,{
    //   backdrop:'static',
    // })
    // modalRef.componentInstance.importFunc = 'BienDong';
    // modalRef.result.then(res=>{
    //   this.GetDanhSachNhomCongToDien();
    //   this._toastr.success(res.mess);
    // })
    // .catch(er=>console.log(er))
  }

  exportExcel() {
    // let data:any;
    // this._services.ExportDanhSachChiTieuChatLuongTheoSanPham({id:"àhsdkhfklsdjfhsdkjfh"}).subscribe((res: any) => {
    //   this._services.download(res.TenFile);
    // })
  }

}
