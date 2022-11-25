import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from 'src/app/quantri/modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ImportdanhmucmodelComponent } from '../danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { DmtieuchichatluongsoimodalComponent } from '../dmtieuchichatluongsoimodal/dmtieuchichatluongsoimodal.component';


@Component({
  selector: 'app-dmtieuchichatluongsoi',
  templateUrl: './dmtieuchichatluongsoi.component.html',
  styleUrls: ['./dmtieuchichatluongsoi.component.css']
})
export class DmtieuchichatluongsoiComponent implements OnInit {

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
      header: 'Đơn vị',
      field: 'DonVi',
      width: 'unset',
      center: 'left'
    },
    {
      header: 'Dung sai cho phép',
      field: 'TenDungSaiChoPhep',
      width: 'unset',
      center: 'left'
    },
    // {
    //   header: 'Ghi chú',
    //   field: 'GhiChu',
    //   width: 'unset',
    //   center: 'center'
    // }
  ];
  selectedItems: any = [];
  dataSearch: any = {};
  userInfo: any;
  listnhamay: any = [];
  listphanxuong: any = [];
  listdungsai: any = [];

  constructor(private _modal: NgbModal, private _services: SanXuatService, private _toastr: ToastrService, private _auth: AuthenticationService) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.getdungsai();
    this.GetDanhSachDuAnByIdUser();
    this.GetListdm();
  }
  resetFilter() {
    this.keyWord = '';
    this.GetListdm()
  }

  getdungsai() {
    this.listdungsai = [
      { Id: "NhoHonHoacBang", Ten: "≤" },
      { Id: "CongTru", Ten: "±" },
      { Id: "LonHonHoacBang", Ten: "≥" },
      { Id: "Thin-40%", Ten: "Thin (- 40%)" },
      { Id: "Thin-50%", Ten: "Thin (- 50%)" },
      { Id: "Thick+35%", Ten: "Thick (+ 35%)" },
      { Id: "Thick+50%", Ten: "Thick (+ 50%)" },
      { Id: "Neps+140%", Ten: "Neps (+ 140%)" },
      { Id: "Neps+200%", Ten: "Neps (+ 200%)" },
    ];
    this.listdungsai = mapArrayForDropDown(this.listdungsai, 'Ten', 'Id')
  }

  GetDanhSachDuAnByIdUser() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listnhamay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  GetListdm(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;     
    }
    this.dataSearch = {
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.keyWord,    
    };
    this._services.dmTieuChiChatLuongsoi().GetList(this.dataSearch).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
      this.items.forEach(element => {
        this.listdungsai.filter(obj => {
          if (element.DungSaiChoPhep == obj.value) {
            element.TenDungSaiChoPhep = obj.label;
          }
        });
      });
    })
  }
  add() {
    let modalRef = this._modal.open(DmtieuchichatluongsoimodalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.listdungsai = this.listdungsai;
    modalRef.componentInstance.title = 'Thêm mới tiêu chí chất lượng sợi';
    modalRef.result.then(res => {
      // this._toastr.success(res);
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  edit(item) {
    this._services.dmTieuChiChatLuongsoi().Get(item.Id).subscribe((res: any) => {
      let modalRef = this._modal.open(DmtieuchichatluongsoimodalComponent, {
        backdrop: 'static'
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listdungsai = this.listdungsai;
      modalRef.componentInstance.title = 'Cập nhật tiêu chí chất lượng sợi';
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
      this._services.dmTieuChiChatLuongsoi().Delete(item).subscribe((res: any) => {
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
