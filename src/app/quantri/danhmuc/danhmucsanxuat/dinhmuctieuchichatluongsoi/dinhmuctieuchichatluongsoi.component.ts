import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DinhmuctieuchichatluongsoimodalComponent } from '../dinhmuctieuchichatluongsoimodal/dinhmuctieuchichatluongsoimodal.component';
import { ImportdanhmucmodelComponent } from '../modals/importdanhmucmodel/importdanhmucmodel.component';

@Component({
  selector: 'app-dinhmuctieuchichatluongsoi',
  templateUrl: './dinhmuctieuchichatluongsoi.component.html',
  styleUrls: ['./dinhmuctieuchichatluongsoi.component.css']
})
export class DinhmuctieuchichatluongsoiComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord: any = '';
  filter: any = {
  };
  cols: any = [
    {
      header: 'Mã mặt hàng',
      field: 'Ma',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Tên mặt hàng',
      field: 'Ten',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      align: 'left'
    }
  ];
  selectedItems: any = [];
  constructor(private _modal: NgbModal,
    private _services: SanXuatService,
    private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListdm();
  }
  resetFilter() {
    this.filter = {
    };
    this.GetListdm()
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
      IddmLoaiSoi: this.filter.IddmLoaiSoi ? this.filter.IddmLoaiSoi : '',
      Ma: "",
      Ten: "",
      Loai: "1",
    };
    this._services.GetListdmItem(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }

  edit(item) {
    this._services.dmDinhMucTieuChiChatLuongSoi().Get({ idSanPham: item.Id }).subscribe((res: any) => {
      let modalRef = this._modal.open(DinhmuctieuchichatluongsoimodalComponent, {
        backdrop: 'static',
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = res;
      modalRef.componentInstance.SelectItem = item;
      modalRef.result.then(res => {
        this.GetListdm()
      }).catch(er => console.log(er))
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListdm();
  }

  importExcel() {
    let modalRef = this._modal.open(ImportdanhmucmodelComponent, {
      backdrop: 'static',
    })
    // modalRef.componentInstance.importFunc = 'dinhmuctieuchichatluongsoi';
    modalRef.componentInstance.Name = 'dinhmuctieuchichatluongsoi';    
    modalRef.result.then(res => {
      this.GetListdm();
      this._toastr.success(res.mess);
    })
      .catch(er => console.log(er))
  }
  exportExcel() {
    let data:any;
    this._services.ExportDanhSachChiTieuChatLuongTheoSanPham({id:"àhsdkhfklsdjfhsdkjfh"}).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }

}
