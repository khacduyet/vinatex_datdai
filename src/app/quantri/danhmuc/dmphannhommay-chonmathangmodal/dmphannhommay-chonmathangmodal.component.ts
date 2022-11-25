import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dmphannhommay-chonmathangmodal',
  templateUrl: './dmphannhommay-chonmathangmodal.component.html',
  styleUrls: ['./dmphannhommay-chonmathangmodal.component.css']
})
export class DmphannhommayChonmathangmodalComponent implements OnInit {

  public selectedItems: any = [];
  public items: any = [];
  public title: any = '';
  public type = '';
  opt: any = "";
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset',
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset',
    },
    {
      header: 'Loại sợi',
      field: 'TendmLoaiSoi',
      width: 'unset',
    },
  ];
  IdQuyTrinh: any = "";
  listloaisoi: any = [];
  khongclicknhieu: any = false;
  filter: any = {};
  checkedAll: boolean = false;
  CongDoan: any = "";

  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.selectedItems.length !== 0) {
      this.selectedItems.filter(item => {
        if (item.isXoa == undefined || item.isXoa == null)
          item.isXoa = false;
      });
    }
    if (this.opt === 'MATHANG') {
      this.GetLoaiSoi();
      this.GetDMMatHang();
    }
    if (this.items.length !== 0) {
      this.checkedAll = this.items.every((ele) => ele.checked);
    }
    if (this.opt === 'SOI') {
      this.GetListLoaiSoi()
      this.cols = [
        {
          header: 'Mã',
          field: 'Ma',
          width: 'unset',
        },
        {
          header: 'Tên',
          field: 'Ten',
          width: 'unset',
        }
      ];
    }
  }

  GetLoaiSoi() {
    let dataSearch: any = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this.sanXuatService.GetListdmLoaiSoi(dataSearch).subscribe((res: any) => {
      this.listloaisoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListLoaiSoi() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord != undefined && this.filter.keyWord != null ? this.filter.keyWord : "",
      CongDoan: '',
      Ma: "",
      Ten: "",
    };
    this.sanXuatService.GetListdmLoaiSoi(data).subscribe((res: any) => {
      this.items = res;
      // if (this.selectedItems.length !== 0) {
      //   this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
      //     let selected = this.items.filter(item => sItem.IddmLoaiSoi === item.Id)[0];
      //     if (selected) {
      //       selected.checked = true;
      //     }
      //   });
      // }
    })
  }
  GetDMMatHang() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord != undefined && this.filter.keyWord != null ? this.filter.keyWord : "",
      CongDoan: '',
      Ma: "",
      Ten: "",
      Loai: "1",
      IddmLoaiSoi: this.filter.IddmLoaiSoi
    };
    this.sanXuatService.GetListdmItem(data).subscribe((res: any) => {
      // if (this.selectedItems.length !== 0) {
      //   this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
      //     let selected = res.filter(item => sItem.IddmItem === item.Id)[0];
      //     if (selected) {
      //       selected.checked = true;
      //     }
      //   });
      // }
      this.items = res;
    })
  }

  checkAll(e) {
    if (e.checked) {
      this.items.forEach(item => {
        item.checked = true;
      });
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    // this.GetDMMatHang();
  }

  addItem(e, item) {
    if (e.checked) {
      this.selectedItems.push(item);
    }
    else {
      if (this.selectedItems.length > 0) {
        let selectedItems = this.selectedItems.map(obj =>
          obj.IddmPhanNhomMay != item.Id
        );
        this.selectedItems = selectedItems;
      }
    }
  }

  accept() {
    this.activeModal.close(
      this.items.filter(item => item.checked).map(ele => {
        let data = {
          ...ele,  
          IddmPhanNhomMay: this.IdQuyTrinh || "",
          Id: '',
        }
        if (this.opt === 'MATHANG') {
          data.IddmItem = ele.Id;
        }
        if (this.opt === 'SOI') {
          data.IddmLoaiSoi = ele.Id
        }
        return data
      }));
  }

  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.success(res.message);
      this.activeModal.close();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }

}
