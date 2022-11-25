import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TreeNode } from 'primeng/api';
import { Dat09Service } from "src/app/services/callApi";
import { ModalThuaDatComponent } from '../modal/modal-thua-dat/modal-thua-dat.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../modal/modalthongbao/modalthongbao.component';
import { TinhtrangtaisanComponent } from '../danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { capQuanLy } from 'src/app/services/const';
import { MenuItem } from 'primeng/api/menuitem';
import { ModaladvancedsearchComponent } from '../modal/modaladvancedsearch/modaladvancedsearch.component';
import { DateToUnix, deepCopy, UnixToDate, validVariable } from 'src/app/services/globalfunction';
@Component({
  selector: 'app-quanlytaisannhadat',
  templateUrl: './quanlytaisannhadat.component.html',
  styleUrls: ['./quanlytaisannhadat.component.css'],
  providers: [DialogService]
})
export class QuanlytaisannhadatComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  @ViewChild('chonVung') chonVung: any;
  vung: any = {

  };
  menuCapQuanLy: MenuItem[];
  capQuanLy: any = capQuanLy;
  showSoDos: boolean = false;
  ThongKeThongTinThuaDat: any = [];
  TongDienTichDat: any = 0;
  currentUser: any;
  selectedVung: TreeNode = {};
  vungs: TreeNode[] = [];
  advancedSearch: boolean = false;
  pagingThuaDat: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  thuaDats: any = [

  ];
  DaBan: boolean = false;
  selectedThuaDat: any = {};
  selecteThuaDat: any = {};
  searchItem: any = {
    ThongTinChung: {},
    TaiSanTrenDat: {},
    TinhTrangPhapLy: {},
    HoSoVanBanPhapQuy: {}
  };
  keyWord: string = '';
  constructor(private _modal: NgbModal, private _services: Dat09Service, private _auth: AuthenticationService, private _toast: ToastrService) {
    this.currentUser = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.menuCapQuanLy = this.capQuanLy.map(ele => {
      return {
        label: ele.label,
        command: () => {
          this.add(ele.value);
        }
      }
    })
    this.GetListdmDonVi();
  }
  GetListdmDonVi() {
    let data = {
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: "",
    };
    this._services.GetListdmDonVi(data).subscribe(
      (res: any) => {
        let data = res.map((ele: any) => {
          return {
            label: ele.Ten + ` (${ele.TongSoThuaDat})`,
            data: ele,
            key: ele.ID.toString(),
            parentKey: ele.IDParent?.toString() || null
          }
        })
        this.selectedVung = res[0];
        this.flatToTreeArray(data, "key", "parentKey");
        this.GetListTaiSanDat(null);
      },
      (err: any) => {
        this.vung["Ten"] = "Có lỗi xảy ra";
      }
    );
  }
  flatToTreeArray(list, Id: string, pId: string) {
    let finalData = [];
    list.forEach((element) => {
      element.children = [];
    });
    list.forEach((element) => {
      if (element[pId] !== null) {
        if (
          list.filter((e: any) => e[Id] === element[pId])[0] !== null &&
          list.filter((e: any) => e[Id] === element[pId])[0] !== undefined
        ) {
          list
            .filter((e: any) => e[Id] === element[pId])[0]
            .children.push(element);
        } else {
          finalData.push(element);
        }
      } else {
        finalData.push(element);
      }
    });
    this.vungs = finalData;
    // console.log(this.currentUser.IDdmDonVi);
    // this.selectedVung = list.filter(ele => ele[Id] === this.currentUser.IDdmDonVi.toString())[0];
    // this.selectedVung = list[0];
    this.vung = this.selectedVung;
  }
  nodeSelect(event): void {
    this.chonVung.hide();
    this.vung = event.node.data;
    this.GetListTaiSanDat(null);
  }
  onThuaDatSelect(event): void {
    if (event == null || event == undefined) {
      return;
    }
    if (event.data == null || event.data == undefined) {
      return;
    }
    this.selectedThuaDat = {};
    this.showSoDos = false;
    this._services.GetTaiSanDat(event.data.ID).subscribe((res: any) => {
      res.HienTrangSuDungs.forEach(ele => {
        ele.ThoiGian = UnixToDate(ele.ThoiGianUnix);
      });
      this.selectedThuaDat = res;
      this.showSoDos = true;
      this._services.ThongKeThongTinThuaDat({ IDTaiSan: this.selectedThuaDat.ID }).subscribe((res: any) => {
        this.ThongKeThongTinThuaDat = res;
      })
    });

  }
  onThuaDatRemove() {
    this.selecteThuaDat = {};
    this.selectedThuaDat = {};
  }
  GetListTaiSanDat(ID: any, reset?) {
    if (reset) {
      this.pagingThuaDat.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 5,
      CurrentPage: this.pagingThuaDat.CurrentPage,
      IDdmDonVi: this.vung.ID,
      sFilter: this.keyWord,
      Ma: "",
      Ten: "",
      IsDaBan: this.DaBan
    };
    this._services.GetListTaiSanDat(data).subscribe((res: any) => {
      res.items.forEach((e) => {
        e.selected = false;
      });
      this.thuaDats = res.items;
      this.pagingThuaDat = res.paging;
      this.TongDienTichDat = res.TongDienTichDat;
      if (ID === null) {
        this.onThuaDatSelect({ data: res.items[0] })
        this.selecteThuaDat = res.items[0];
      } else {
      }
    });
  }
  changeHienTrang(e: any) {
    this._services.GetTaiSanDat(this.selecteThuaDat.ID).subscribe((res: any) => {
      res.HienTrangSuDungs.forEach(ele => {
        ele.ThoiGian = UnixToDate(ele.ThoiGianUnix);
      });
      this.selectedThuaDat = res;
      this._services.ThongKeThongTinThuaDat({ IDTaiSan: this.selectedThuaDat.ID }).subscribe((res: any) => {
        this.ThongKeThongTinThuaDat = res;
      })
    });

  }
  add(capQuanLy?: number): void {
    if (this.vung?.ID !== 0) {
      let modalRef = this._modal.open(ModalThuaDatComponent, {
        size: 'fullscreen',
        backdrop: 'static',
        keyboard: false
      })
      modalRef.componentInstance.opt = 'add';
      modalRef.componentInstance.item = {
        ID: 0,
        IDdmDonVi: this.vung.ID,
        TaiSanDat: {
          ID: 0,
          MaHanhDong: capQuanLy
        },
        HoSos: [],
        TaiSanDatNhas: [],
        SoDos: [],
        BienDongs: [],
        GiaDats: []
      }
      modalRef.result.then((res: any) => {
        this._toast.success('Cập nhật thành công');
        this.GetListTaiSanDat(this.vung?.ID);
      })
        .catch(er => { console.log(er) })
    }
  }

  edit(item) {
    this.selecteThuaDat = {};
    this.selectedThuaDat = {};
    this._services.GetTaiSanDat(item.ID).subscribe((res: any) => {
      let modalRef = this._modal.open(ModalThuaDatComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res));
      modalRef.componentInstance.item.TaiSanDat.NgayCapGCN = UnixToDate(res.TaiSanDat.NgayCapGCNUnix);
      modalRef.componentInstance.item.TaiSanDat.NgayCapGPKD = UnixToDate(res.TaiSanDat.NgayCapGPKDUnix);
      modalRef.componentInstance.item.TaiSanDat.NgayKyGiaoDat = UnixToDate(res.TaiSanDat.NgayKyGiaoDatUnix);
      modalRef.componentInstance.item.TaiSanDat.NgayCapGPKDBydmDonViSHD = UnixToDate(res.TaiSanDat.NgayCapGPKDBydmDonViSHDUnix);
      modalRef.componentInstance.item.TaiSanDat.ThoiHanSuDungTuNgay = UnixToDate(res.TaiSanDat.ThoiHanSuDungTuNgayUnix);
      modalRef.componentInstance.item.TaiSanDat.ThoiHanSuDungDenNgay = UnixToDate(res.TaiSanDat.ThoiHanSuDungDenNgayUnix);
      modalRef.result.then((res: any) => {
        this._toast.success('Cập nhật thành công');
        this.GetListTaiSanDat(item.ID);
      })
        .catch(er => { console.log(er) })
    })
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.DeleteTaiSanDat(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toast.success(res.message);
            this.GetListTaiSanDat(null);
          } else {
            this._toast.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  changePage(event) {
    this.pagingThuaDat.CurrentPage = event.page + 1;
    this.GetListTaiSanDat(this.vung.ID);
  }
  resetFilter() {
    this.keyWord = '';
    this.searchItem = {
      ThongTinChung: {},
      TaiSanTrenDat: {},
      TinhTrangPhapLy: {},
      HoSoVanBanPhapQuy: {}
    };
    this.advancedSearch = false;
    this.GetListTaiSanDat(this.vung.ID);
  }
  khoaThuaDat(item) {
    let data = {
      Id: item.ID,
      ActionRole: (item.TaiSanDat.ActionRole === 'ACTION_ALL' ? 'ACTION_VIEW' : 'ACTION_ALL')
    }
    this._services.SetActionRole(data).subscribe((res: any) => {
      if (res.State === 1) {
        this._toast.success(res.message);
        this.GetListTaiSanDat(this.vung.ID);
      } else {
        this._toast.error(res.message);
      }
    })
  }
  GetBaoCaoTaiSanDat() {
    this._services.GetBaoCaoTaiSanDat(this.searchItem).subscribe(res => {
      this.thuaDats = res;
    })
  }
  advSearch() {
    let modalRef = this._modal.open(ModaladvancedsearchComponent, {
      backdrop: 'static',
      size: 'lg'
    })
    modalRef.componentInstance.searchItem = deepCopy(this.searchItem);
    modalRef.componentInstance.searchItem.ThongTinChung.NgayCap = validVariable(this.searchItem.ThongTinChung.NgayCap) ? new Date(this.searchItem.ThongTinChung.NgayCap) : undefined;
    modalRef.componentInstance.searchItem.HoSoVanBanPhapQuy.NgayQuyetDinh = validVariable(this.searchItem.HoSoVanBanPhapQuy.NgayQuyetDinh) ? new Date(this.searchItem.HoSoVanBanPhapQuy.NgayQuyetDinh) : undefined;
    modalRef.result.then(res => {
      this.advancedSearch = true;
      this.searchItem = res;
      this.GetBaoCaoTaiSanDat();
    }).catch(er => {
    })
  }
  exportExcel() {
    if (this.advancedSearch) {
      this._services.ExportExcelBaoCaoTaiSanDat(this.searchItem).subscribe((res: any) => {
        if (res?.Error?.State === 1) {
          this._services.download(res.FileName);
        } else {
          this._toast.error('Có lỗi xảy ra!')
        }
      })
    } else {
      this._services.ExportExcelBaoCaoTaiSanDat({IsDaBan:this.DaBan}).subscribe((res: any) => {
        if (res?.Error?.State === 1) {
          this._services.download(res.FileName);
        } else {
          this._toast.error('Có lỗi xảy ra!')
        }
      })
    }
  }
}
