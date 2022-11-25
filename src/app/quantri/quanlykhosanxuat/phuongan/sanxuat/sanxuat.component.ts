import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, DateToUnix } from 'src/app/services/globalfunction';
import { SanxuatmodalComponent } from '../sanxuatmodal/sanxuatmodal.component';

@Component({
  selector: 'app-sanxuat',
  templateUrl: './sanxuat.component.html',
  styleUrls: ['./sanxuat.component.css']
})
export class SanxuatComponent implements OnInit {
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
      header: 'Ghi chú',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this._service.SanXuat().Get(res.id).subscribe((res: any) => {
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
    this.router.navigate([`quantri/kehoachsanxuat/sanxuat/${id}`], { replaceUrl: true })
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(SanxuatmodalComponent, {
      size: 'fullscreen-100',
      backdrop: 'static',
      keyboard:false
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      SoQuyTrinh: 'PKK_0000_0001',
      listKienHang: []
      // ID:null,
      // TepDinhKems:[],
      // templistTaiSanQuyTrinh:[],
      // listTaiSanQuyTrinh:[]
    }
    modalRef.componentInstance.checkbutton = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true }
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
  }
  update(item) {
    let tempPhuongAnPhaBong = deepCopy(item.PhuongAnPhaBong);
    item.PhuongAnPhaBong = undefined;
    let modalRef = this._modal.open(SanxuatmodalComponent, {
      size: 'fullscreen-100',
      backdrop: 'static',
      keyboard:false
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = tempPhuongAnPhaBong;
    modalRef.componentInstance.ghostItem = deepCopy(item);
    modalRef.result.then((res: any) => {
      console.log(res);
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
    this._service.SanXuat().GetList(data).subscribe((res: any) => {
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
