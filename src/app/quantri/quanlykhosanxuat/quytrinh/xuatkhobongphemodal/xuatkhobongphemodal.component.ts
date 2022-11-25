import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-xuatkhobongphemodal',
  templateUrl: './xuatkhobongphemodal.component.html',
  styleUrls: ['./xuatkhobongphemodal.component.css']
})
export class XuatkhobongphemodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi:true,
    KhongDuyet:false,
    ChuyenTiep:false,
    Xoa:false,
  }
  lang: any = vn;
  listKho: any = [];
  listPhanXuong: any = [];
  listPhuongAnPhaBong: any = [];
  listItem: any = [];
  paging: any = {CurrentPage: 1};

  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, 
    public toastr: ToastrService, public _modal: NgbModal) {  }

  ngOnInit(): void {
    this.KiemTraButtonModal();
    if(this.opt === 'edit'){
      this.GetQuyTrinh();
    }
    //
    let data:any = {
      CurrentPage: 0
    }
    this.services.PhuongAnPhaBong().GetList(data).subscribe((res:any)=>{
      this.listPhuongAnPhaBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    data.Loai = 7;
    this.services.GetListdmKho(data).subscribe((res:any)=>{
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.GetListdmPhanXuong(data).subscribe((res:any)=>{
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
  }
  GetQuyTrinh()
  {
    this.services.PhieuXuatBongPhe().Get(this.item.Id).subscribe((res1:any)=>{
      this.item = res1;
      this.listItem = res1.listItem;
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0,15);
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
 
  ChuyenDuyet() {
    if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
      this.item.NgayChungTuUnix = (new Date(this.item.NgayChungTu)).getTime() / 1000;
    
    this.services.PhieuXuatBongPhe().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
  GetNextSoQuyTrinh() {
    this.services.PhieuXuatBongPhe().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
 
  GhiLai() {
    if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
      this.item.NgayChungTuUnix = (new Date(this.item.NgayChungTu)).getTime() / 1000;

      this.services.PhieuXuatBongPhe().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.KiemTraButtonModal();
            // this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message);
          }
        }
      })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.PhieuXuatBongPhe().Delete(this.item).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
 
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  
  GetLuuKho(sFilter) {
    console.log(this.item)
    this.services.getLuuKhoKhac(this.item.IddmKho,'', 0 , sFilter).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.listItem;
      modalRef.componentInstance.cols = [{
          header: 'Tên',
          field: 'Ten',
          width: 'unset'
        },
        {
          header: 'Khối lượng',
          field: 'SoLuong',
          width: 'unset'
        },
      ];
      modalRef.result.then((data) => {
        this.item.listItem = data.data;
      }, (reason) => {
        // không
      });
    })
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page)  + 1;
    var end =  start + 14;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listItem = this.listItem.slice(start,end);
  }
}
