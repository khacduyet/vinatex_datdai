import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { Dongvanpx1Component } from '../layoutmodals/dongvanpx1/dongvanpx1.component';
import { Dongvanpx2Component } from '../layoutmodals/dongvanpx2/dongvanpx2.component';
import { XepbanbongmodalComponent } from '../xepbanbongmodal/xepbanbongmodal.component';

@Component({
  selector: 'app-xepbanbong',
  templateUrl: './xepbanbong.component.html',
  styleUrls: ['./xepbanbong.component.css']
})
export class XepbanbongComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    // {
    //   header: 'Kế hoạch giao(Tấn)',
    //   field: '',
    //   width: 'unset'
    // },
    // {
    //   header: 'Kế hoạch thực hiện',
    //   field: 'NoiDung',
    //   width: 'unset'
    // },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  defineComponent: any = {
    '53': {
      px1: Dongvanpx1Component,
      px2: Dongvanpx2Component
    }
  }
  mapIdPhanXuong: any = {
    '1cf3f340_0f55_4f34_938p_e329318e25et': 'px1',
    '1cf3f340_0f55_4f34_938p_e629318e25et': 'px2'
  }
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router, private _store: StoreService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this._service.XepBanBong().Get(res.id).subscribe((res: any) => {
          console.log(res);
          // res.listItem.forEach(ele => {
          //   ele.KhoiLuongKeHoach = ele.KhoiLuongKeHoach / 1000;
          // });
          this.update(res);
        })
      }
    })
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()
  }
  changeParam(id) {
    this.router.navigate([`quantri/trienkhaisanxuat/xepbanbong/${id}`], { replaceUrl: true })
  }
  // add() {
  //   this.changeParam(0);
  //   let modalRef = this._modal.open(XepbanbongmodalComponent, {
  //     size: 'fullscreen-100',
  //     backdrop: 'static',
  //     keyboard:false
  //   })
  //   modalRef.componentInstance.opt = 'add';
  //   modalRef.componentInstance.item = {
  //     SoQuyTrinh: 'PKK_0000_0001',
  //     listKienHang: []
  //     // ID:null,
  //     // TepDinhKems:[],
  //     // templistTaiSanQuyTrinh:[],
  //     // listTaiSanQuyTrinh:[]
  //   }
  //   modalRef.componentInstance.checkbutton = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true }
  //   modalRef.result.then((res: any) => {
  //     console.log(res);
  //     this._toastr.success('Cập nhật thành công');
  //     this.GetListQuyTrinh();
  //     this.changeParam(0);
  //   })
  //     .catch(er => {
  //       this.GetListQuyTrinh();
  //       this.changeParam(0);
  //     })
  // }
  update(item) {
    let component = this.defineComponent[`${this._store.getCurrent()}`][this.mapIdPhanXuong[item.IddmPhanXuong.split('-').join('_')]]
    console.log(component);
    item.PhuongAnPhaBong = undefined;
    let modalRef = this._modal.open(component, {
      size: 'fullscreen-100',
      backdrop: 'static',
      keyboard: false
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = deepCopy(item);
    // modalRef.componentInstance.ghostItem = deepCopy(item);
    modalRef.result.then((res: any) => {
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this._service.XepBanBong().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    // this._service.KiemTraButtonThemMoi().subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetListQuyTrinh();
    // })
  }
}
