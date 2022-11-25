import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from 'src/app/quantri/modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { congDoan } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhsachmaymodalComponent } from '../modals/danhsachmaymodal/danhsachmaymodal.component';
import { ImportdanhmucmodelComponent } from '../modals/importdanhmucmodel/importdanhmucmodel.component';

@Component({
  selector: 'app-danhsachmay',
  templateUrl: './danhsachmay.component.html',
  styleUrls: ['./danhsachmay.component.css']
})
export class DanhsachmayComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  listdmPhanXuong: any = []
  filter: any = {
  };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '300px',
      center: 'left'
    },
    {
      header: 'Hãng sản xuất',
      field: 'HangSanXuat',
      width: '150px',
      center: 'center'
    },
    {
      header: 'Nước sản xuất',
      field: 'NuocSanXuat',
      width: '100px',
      center: 'center'
    },
    {
      header: 'Ký hiệu máy',
      field: 'KyHieuMay',
      width: '100px',
      center: 'center'
    },
    {
      header: 'Năm sản xuất',
      field: 'NamSanXuat',
      width: '100px',
      center: 'center'
    },
    {
      header: 'Năm sử dụng',
      field: 'NamSuDung',
      width: '100px',
      center: 'center'
    },
    {
      header: 'Phân nhóm máy',
      field: 'TendmPhanNhom',
      width: '100px',
      center: 'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      center: 'center'
    }
  ];
  listCongDoan: any = [];
  listPhanNhomMaySX: any = [];
  selectedItems: any = [];
  listphannhommay: any = [];
  constructor(private _modal: NgbModal, private _services: SanXuatService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListdmPhanNhomMaySanXuat();
    this.GetListdm();
    this.getlistphannhommay();
    this.getListCongDoan();
    this.getListdmPhanXuong();

  }
  resetFilter() {
    this.filter = {
    };
    this.GetListdm()
  }

  GetListdmPhanNhomMaySanXuat() {
    this._services.dmPhanNhomMaySanXuat().GetList({}).subscribe((res: any) => {
      this.listPhanNhomMaySX = res;
    })
  }

  GetListdm(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.filter.keyWord ? this.filter.keyWord : '',
      IddmPhanNhom: this.filter.IddmPhanNhom ? this.filter.IddmPhanNhom : '',
      Ma: "",
      Ten: "",
    };
    this._services.GetListdmMay(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
      if (this.items.length > 0 && this.listPhanNhomMaySX.length > 0) {
        this.items.forEach(element => {
          element.TendmPhanNhom = this.listPhanNhomMaySX.filter(obj => obj.value == element.IddmPhanNhom)[0].Ten;
        });
      }
    })
  }
  add() {
    let modalRef = this._modal.open(DanhsachmaymodalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.listdmPhanXuong = this.listdmPhanXuong;
    modalRef.componentInstance.listCongDoan = this.listCongDoan;
    modalRef.componentInstance.listPhanNhomMaySX = this.listPhanNhomMaySX;
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  edit(item) {
    // item.CongDoan = item.CongDoan.map(ele=>ele.CongDoan);
    let modalRef = this._modal.open(DanhsachmaymodalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.listdmPhanXuong = this.listdmPhanXuong;
    modalRef.componentInstance.listCongDoan = this.listCongDoan;
    modalRef.componentInstance.listPhanNhomMaySX = this.listPhanNhomMaySX;
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.DeletedmMay(item).subscribe((res: any) => {
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
  deleteAll() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.DeletedmMay(this.selectedItems).subscribe((res: any) => {
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
    }).catch(er => console.log(er))
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListdm();
  }

  getListdmPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCongDoan() {
    this._services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }

  getlistphannhommay() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      KeyWord: this.keyWord,
      Ma: "",
      Ten: ""
    };
    this._services.dmPhanNhomMaySanXuat().GetList(data).subscribe((res: any) => {
      this.listphannhommay = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  importExcel() {
    let modalRef = this._modal.open(ImportdanhmucmodelComponent, {
      backdrop: 'static',
    })
    modalRef.componentInstance.importFunc = 'SCM_dmMay';
    modalRef.result.then(res => {
      this.GetListdm();
      this._toastr.success(res.mess);
    })
      .catch(er => console.log(er))
  }
  exportExcel() {
    let dataSearch: any = {};
    dataSearch.TableName = 'SCM_dmMay';
    dataSearch.CurrentPage = 0;
    this._services.Exportdm(dataSearch).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
}
