import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { ModalimportexcelComponent } from '../../modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModaldanhmucchungComponent } from '../modal/modaldanhmucchung/modaldanhmucchung.component';

@Component({
  selector: 'app-dmhientrangsudung',
  templateUrl: './dmhientrangsudung.component.html',
  styleUrls: ['./dmhientrangsudung.component.css']
})
export class DmhientrangsudungComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '250px',
      align: 'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '300px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    }
  ];
  item: any = {};

  constructor(private _modal: NgbModal, private _services: Dat09Service, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetItems();
  }

  GetItems() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.keyWord,
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmHienTrangSuDung(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.keyWord = '';
    this.GetItems()
  }

  add() {
    let modalRef = this._modal.open(ModaldanhmucchungComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'dmHienTrangSuDung';
    modalRef.componentInstance.title = 'Thêm mới danh mục hiện trạng sử dụng';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetItems()
    }).catch(er => console.log(er))
  }

  edit(item) {
    let modalRef = this._modal.open(ModaldanhmucchungComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục hiện trạng sử dụng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'dmHienTrangSuDung';
    modalRef.result.then(res => {
      this._toastr.success(res);
      this.GetItems()
    }).catch(er => console.log(er))
  }

  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.DeletedmHienTrangSuDung(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetItems();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetItems();
  }
  importExcel() {
    let modalRef = this._modal.open(ModalimportexcelComponent, {
      backdrop: 'static',
    })
    modalRef.componentInstance.importFunc = 'HienTrangSuDung';
    modalRef.result.then(res => {
      this.GetItems();
      this._toastr.success(res.mess);
    })
      .catch(er => console.log(er))
  }
}
