import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from 'src/app/quantri/modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ImportdanhmucmodelComponent } from '../danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { DmphannhommaymodalComponent } from '../dmphannhommaymodal/dmphannhommaymodal.component';

@Component({
  selector: 'app-dmphannhommay',
  templateUrl: './dmphannhommay.component.html',
  styleUrls: ['./dmphannhommay.component.css']
})
export class DmphannhommayComponent implements OnInit {

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
      align: 'left'
    },
    {
      header: 'Công đoạn',
      field: 'TenCongDoan',
      width: 'unset',
      align: 'left'
    },
    {
      header: 'Đơn vị năng suất',
      field: 'TenDonViNangSuat',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      align: 'center'
    }
  ];
  selectedItems: any = [];
  dataSearch: any = {};
  userInfo: any;
  listnhamay: any = [];
  listDonViNangSuat: any = [];
  listCongDoan: any = [];
  // listphanxuong: any = [];
  // listdungsai: any = [];

  constructor(private _modal: NgbModal, private _services: SanXuatService, private _toastr: ToastrService, private _auth: AuthenticationService) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.GetDanhSachDuAnByIdUser();
    this.getDonViNangXuat();
    this.GetListdm();
  }

  getDonViNangXuat() {
    let listDonViNangSuat = [
      { Id: 0, Ten: "M" },
      { Id: 1, Ten: "Kg" },
    ];
    this.listDonViNangSuat = mapArrayForDropDown(listDonViNangSuat, 'Ten', 'Id');
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

  GetListdm(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    this.dataSearch = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.keyWord,
      Ma: "",
      Ten: ""
    };
    this._services.dmPhanNhomMaySanXuat().GetList(this.dataSearch).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
      // this.items.forEach(element => {
      //   this.listnhamay.filter(obj => {
      //     if (element.idNhaMay == obj.value) {
      //       element.TenNhaMay = obj.label;
      //     }
      //   });
      //   this.listphanxuong.filter(obj => {
      //     if (element.idPhanXuong == obj.value) {
      //       element.TenPhanXuong = obj.label;
      //     }
      //   });
      // });        
      this._services.GetListCongDoan().subscribe((res: any) => {
        this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
        if (this.items.length > 0 && this.listDonViNangSuat.length > 0) {
          this.items.forEach(el => {
            el.TenDonViNangSuat = this.listDonViNangSuat.filter(obj => obj.value == el.DonViNangSuat)[0].label;
            el.TenCongDoan = this.listCongDoan.filter(obj => obj.value == el.CongDoan)[0].label;
          });
        }
      })
    })
  }
  add() {
    let modalRef = this._modal.open(DmphannhommaymodalComponent, {
      size: "fullscreen-100",
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.title = 'Thêm mới phân nhóm máy';
    modalRef.componentInstance.listDonViNangSuat = this.listDonViNangSuat;
    modalRef.componentInstance.item = {
      Id: '',
      lstdmItem: []
    }
    modalRef.result.then(res => {
      // this._toastr.success(res);
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  edit(item) {
    this._services.dmPhanNhomMaySanXuat().Get(item.Id).subscribe((res: any) => {
      // let data = {
      //   PageSize: 20,
      //   CurrentPage: 0,
      //   sFilter: "",
      //   CongDoan: '',
      //   Ma: "",
      //   Ten: "",
      //   Loai: "1",
      // };
      // this._services.GetListdmItem(data).subscribe((resGetListdmItem: any) => {
      //   resGetListdmItem.forEach(element => {
      //     res.lstdmItem.filter(obj => {
      //       if (obj.IddmItem == element.Id) {
      //         obj.Ten = element.Ten;
      //         obj.Ne = element.Ne;
      //         obj.Nm = element.Nm;
      //         obj.DoSan = element.DoSan;
      //       }
      //     });
      //   });
      // })
      let modalRef = this._modal.open(DmphannhommaymodalComponent, {
        size: "fullscreen-100",
        backdrop: 'static'
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.title = 'Cập nhật phân nhóm máy';
      modalRef.componentInstance.listDonViNangSuat = this.listDonViNangSuat;
      modalRef.componentInstance.item = res;
      modalRef.result.then(res => {
        // this._toastr.success(res);
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
      this._services.dmPhanNhomMaySanXuat().Delete(item.Id).subscribe((res: any) => {
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
