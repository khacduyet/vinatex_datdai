import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from 'src/app/quantri/modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ImportdanhmucmodelComponent } from '../../danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { DmmaybienapmodalComponent } from '../dmmaybienapmodal/dmmaybienapmodal.component';

@Component({
  selector: 'app-dmmaybienap',
  templateUrl: './dmmaybienap.component.html',
  styleUrls: ['./dmmaybienap.component.css']
})
export class DmmaybienapComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  cols: any = [
    {
      header: 'Mã máy biến áp',
      field: 'Ma',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Tên máy biến áp',
      field: 'Ten',
      width: 'unset',
      center: 'left'
    },
    {
      header: 'Nhà máy',
      field: 'TenNhaMay',
      width: 'unset',
      center: 'left'
    },
    {
      header: 'Phân xưởng',
      field: 'TenPhanXuong',
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
  dataSearch: any = {};
  userInfo: any;
  listnhamay: any = [];
  listphanxuong: any = [];
  
  constructor(private _modal: NgbModal, private _services: SanXuatService, private _toastr: ToastrService, private _auth: AuthenticationService) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.GetDanhSachDuAnByIdUser();
    this.GetPhanXuong();
    this.GetListdm();
  }
  resetFilter() {
    this.keyWord = '';
    this.GetListdm()
  }

  GetDanhSachDuAnByIdUser() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listnhamay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  GetPhanXuong() {
    this._services.GetOptions().GetPhanXuong(0).subscribe((res: any) => {
      this.listphanxuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListdm(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      // this.paginator.changePage(0);
    }
    this.dataSearch = {
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.keyWord,   
    };
    this._services.DMMayBienAp().GetList(this.dataSearch).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
      this.items.forEach(element => {
        this.listnhamay.filter(obj => {
          if (element.idNhaMay == obj.value) {
            element.TenNhaMay = obj.label;
          }
        });
        this.listphanxuong.filter(obj => {
          if (element.idPhanXuong == obj.value) {
            element.TenPhanXuong = obj.label;
          }
        });
      });
      // this.paging = res.paging;
    })
  }
  add() {
    let modalRef = this._modal.open(DmmaybienapmodalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';    
    modalRef.componentInstance.listnhamay = this.listnhamay;
    modalRef.componentInstance.title = 'Thêm mới máy biến áp';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  edit(item) {
    this._services.DMMayBienAp().Get(item.Id).subscribe((res: any) => {
      let modalRef = this._modal.open(DmmaybienapmodalComponent, {
        backdrop: 'static'
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listnhamay = this.listnhamay;
      modalRef.componentInstance.title = 'Cập nhật máy biến áp';
      modalRef.componentInstance.item = res;
      modalRef.result.then(res => {
        this._toastr.success(res);
        this.GetListdm()
      }).catch(er => console.log(er))
    })
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.DMMayBienAp().Delete(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdm();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  // deleteAll() {
  //   let modalRef = this._modal.open(ModalthongbaoComponent, {
  //     backdrop: 'static'
  //   });
  //   modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
  //   modalRef.result.then(res => {
  //     this._services.DeletedmCapBong(this.selectedItems).subscribe((res: any) => {
  //       if (res) {
  //         if (res.State === 1) {
  //           this._toastr.success(res.message);
  //           this.GetListdm();
  //           this.selectedItems = [];
  //         } else {
  //           this._toastr.error(res.message);
  //         }
  //       }
  //     })
  //   }).catch(er => console.log(er))
  // }
  // changePage(event) {
  //   this.paging.CurrentPage = event.page + 1;
  //   this.GetListdm();
  // }
  importExcel() {
    // let modalRef = this._modal.open(ImportdanhmucmodelComponent, {
    //   backdrop: 'static',
    // })
    // modalRef.componentInstance.importFunc = 'SCM_dmCapBong';
    // modalRef.result.then(res => {
    //   this.GetListdm();
    //   this._toastr.success(res.mess);
    // })
    //   .catch(er => console.log(er))
  }
  exportExcel() {
    // this.dataSearch.TableName = 'SCM_dmCapBong';
    // this.dataSearch.CurrentPage = 0;
    // this._services.Exportdm(this.dataSearch).subscribe((res: any) => {
    //   this._services.download(res.TenFile);
    // })
  }
}