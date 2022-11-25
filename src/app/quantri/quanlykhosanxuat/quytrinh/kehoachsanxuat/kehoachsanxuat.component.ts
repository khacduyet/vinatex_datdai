import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { GiaokehoachsanxuathoanthanhmodalComponent } from '../giaokehoachsanxuathoanthanhmodal/giaokehoachsanxuathoanthanhmodal.component';
import { KehoachsanxuatmodalComponent } from '../kehoachsanxuatmodal/kehoachsanxuatmodal.component';

@Component({
  selector: 'app-kehoachsanxuat',
  templateUrl: './kehoachsanxuat.component.html',
  styleUrls: ['./kehoachsanxuat.component.css']
})
export class KehoachsanxuatComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  eAction = 'GIAOKEHOACHSANXUAT';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Tổng sản lượng(tấn)',
      field: 'TongSanLuong',
      width: 'unset'
    },
    {
      header: 'Tổng số ca',
      field: 'TongSoCa',
      width: 'unset'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listQuyCachDongGoi: any = [];

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this.update(res.id)
      }
    })
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()
  }
  changeParam(id) {
    this.router.navigate([`quantri/kehoachsanxuat/giaokehoachsanxuat/${id}`], { replaceUrl: true })
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(KehoachsanxuatmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      Id: '',
      listItem: []
    }
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
      this.changeParam(0)
    })
      .catch(er => { this.GetListQuyTrinh(); this.changeParam(0) })
  }
  update(Id) {
    this._service.GiaoKeHoachSanXuat().Get(Id).subscribe((item: any) => {
      this._service.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
        this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
        if (item.listItem != undefined && item.listItem != null) {
          item.listItem.filter(objlistItem => {
            objlistItem.listItem.filter(async objlistItem2 => {
              objlistItem2.objQuyCachDongGoi = await this.listQuyCachDongGoi.filter(obj => objlistItem2.IddmQuyCachDongGoi == obj.value)[0];
            });          
          });
          let modalRef = this._modal.open(KehoachsanxuatmodalComponent, {
            size: 'fullscreen',
            backdrop: 'static'
          })
          modalRef.componentInstance.opt = 'edit';
          modalRef.componentInstance.item = item;
          modalRef.componentInstance.item.TuNgay = UnixToDate(item.TuNgayUnix);
          modalRef.componentInstance.item.DenNgay = UnixToDate(item.DenNgayUnix);
          modalRef.result.then((res: any) => {
            console.log(res);
            this._toastr.success('Cập nhật thành công');
            this.GetListQuyTrinh();
            this.changeParam(0)
          })
            .catch(er => { this.GetListQuyTrinh(); this.changeParam(0) })
        }
      })  
    },(err)=>{
      if(err.status ===500){
        this._toastr.error('Hệ thống không tìm thấy dữ liệu bạn cần!')
      }
      console.log(err);
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
    this._service.GiaoKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  hoanthanh(Id) {
    // this.router.navigate([`quantri/kehoachsanxuat/giaokehoachsanxuat/${Id}`], { replaceUrl: true })
    this._service.GiaoKeHoachSanXuat().Get(Id).subscribe((item: any) => {
      this._service.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
        this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
        console.log(item)
        if (item.listItem != undefined && item.listItem != null) {
          item.listItem.filter(objlistItem => {
            objlistItem.listItem.filter(async objlistItem2 => {
              objlistItem2.objQuyCachDongGoi = await this.listQuyCachDongGoi.filter(obj => objlistItem2.IddmQuyCachDongGoi == obj.value)[0];
            });          
          });
          let modalRef = this._modal.open(GiaokehoachsanxuathoanthanhmodalComponent, {
            size: 'fullscreen',
            backdrop: 'static'
          })
          modalRef.componentInstance.opt = 'edit';
          modalRef.componentInstance.item = item;
          modalRef.componentInstance.item.TuNgay = UnixToDate(item.TuNgayUnix);
          modalRef.componentInstance.item.DenNgay = UnixToDate(item.DenNgayUnix);
          modalRef.result.then((res: any) => {
            console.log(res);
            this._toastr.success('Cập nhật thành công');
            this.GetListQuyTrinh();
            this.changeParam(0)
          })
            .catch(er => { this.GetListQuyTrinh(); this.changeParam(0) })
        }
      }) 
    });
  }
}
