import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from 'src/app/quantri/modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ImportdanhmucmodelComponent } from '../../danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { DmcongtomodalComponent } from '../dmcongtomodal/dmcongtomodal.component';

@Component({
  selector: 'app-dmcongto',
  templateUrl: './dmcongto.component.html',
  styleUrls: ['./dmcongto.component.css']
})
export class DmcongtoComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  cols: any = [
    {
      header: 'Mã công tơ',
      field: 'Ma',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Tên công tơ',
      field: 'Ten',
      width: 'unset',
      center: 'left'
    },
    {
      header: 'Phân nhóm công tơ',
      field: 'TenNhomCongTo',
      width: 'unset',
      center: 'left'
    },
    {
      header: 'Máy biến áp',
      field: 'TenBienAp',
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
  listmaybienap: any = [];
  listnhomcongto: any = [];
  dataSearch: any = {};
  constructor(private _modal: NgbModal, private _services: SanXuatService, private _toastr: ToastrService, private _auth: AuthenticationService) { }

  ngOnInit(): void {
    this.GetDanhSachMayBienAp();
    this.GetDanhSachCongToDien();
    this.GetListdm();
  }
  resetFilter() {
    this.keyWord = '';
    this.GetListdm()
  }

  GetDanhSachMayBienAp() {
    let data = {
      CurrentPage: 0,
      KeyWord: "",
    };
    this._services.DMMayBienAp().GetList(data).subscribe((res: any) => {
      this.listmaybienap = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetDanhSachCongToDien() {
    let data = {
      CurrentPage: 0,
      KeyWord: "",
    };
    this._services.dmNhomCongToDien().GetList(data).subscribe((res: any) => {
      this.listnhomcongto = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListdm(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;      
    }
    this.dataSearch = {
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.keyWord,
      idMayBienAp: this.dataSearch.idMayBienAp,      
    };
    let idMayBienAp = this.dataSearch.idMayBienAp != undefined && this.dataSearch.idMayBienAp != null && this.dataSearch.idMayBienAp != "" ? this.dataSearch.idMayBienAp : '';
    this._services.dmCongToDien().GetList(this.dataSearch).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
      this.items.forEach(element => {
        this.listnhomcongto.filter(obj => {
          if (element.idNhomCongToDien == obj.value) {
            element.TenNhomCongTo = obj.label;
          }
        });
        this.listmaybienap.filter(obj => {
          if (element.idMayBienAp == obj.value) {
            element.TenBienAp = obj.label;
          }
        });
      });     
    })
  }
  add() {
    let modalRef = this._modal.open(DmcongtomodalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.listmaybienap = this.listmaybienap;
    modalRef.componentInstance.listnhomcongto = this.listnhomcongto;
    modalRef.componentInstance.title = 'Thêm mới công tơ';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  edit(item) {
    this._services.dmCongToDien().Get(item.Id).subscribe((res: any) => {
      let modalRef = this._modal.open(DmcongtomodalComponent, {
        backdrop: 'static'
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listmaybienap = this.listmaybienap;
      modalRef.componentInstance.listnhomcongto = this.listnhomcongto;
      modalRef.componentInstance.title = 'Cập nhật công tơ';
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
      this._services.dmCongToDien().Delete(item).subscribe((res: any) => {
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
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListdm();
  }
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
