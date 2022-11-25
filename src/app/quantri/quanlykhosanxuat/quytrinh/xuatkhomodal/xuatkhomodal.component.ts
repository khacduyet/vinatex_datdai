import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-xuatkhomodal',
  templateUrl: './xuatkhomodal.component.html',
  styleUrls: ['./xuatkhomodal.component.css']
})
export class XuatkhomodalComponent implements OnInit {
  opt: any = '';
  Id: any = '';
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
  items: any = [];
  paging: any = {};
  filter: any = {}
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, 
    public toastr: ToastrService, public _modal: NgbModal) {  }

  ngOnInit(): void {
    this.GetQuyTrinh();

    //
    let data: any = {
      CurrentPage: 0
    }
    this.services.PhuongAnPhaBong().GetList(data).subscribe((res:any)=>{
      this.listPhuongAnPhaBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    // data.Loai = 2;
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
    this.services.PhieuXuatSanXuat().Get(this.Id).subscribe((res1:any)=>{
      this.item = res1;
      this.listItem = res1.listItem;
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0,15);
      this.items = res1.listItem.slice(0,15);
      this.KiemTraButtonModal();
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
    
    this.services.PhieuXuatSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this.services.PhieuXuatSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
 
  GhiLai() {
    if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
      this.item.NgayChungTuUnix = (new Date(this.item.NgayChungTu)).getTime() / 1000;

      this.services.PhieuXuatSanXuat().Set(this.item).subscribe((res: any) => {
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
      this.services.PhieuXuatSanXuat().Delete(this.item).subscribe((res: any) => {
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
    this.services.getLuuKho(this.item.IddmKho,'', 0 , sFilter).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
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
    var start = 15 * (event.page);
    var end =  start + 15;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listItem = this.listItem.slice(start,end);
    this.items = this.listItem.slice(start,end);
    if(this.filter.KeyWord !== '' || this.filter.KeyWord !== undefined)
      this.GetQuyTrinhFilter();
  }

  GetQuyTrinhFilter()
  {
    var items = [];
    for(let i =0; i < this.items.length; i++){
      if(this.items[i].TenLoBong !== null){
        if(this.items[i].TenLoBong.toLowerCase().includes(this.filter.KeyWord)){
           items.push(this.items[i]);
          continue;
        }
      }
      if(this.items[i].Ten !== null){
        if(this.items[i].Ten.toLowerCase().includes(this.filter.KeyWord)){
          items.push(this.items[i]);
          continue;
        }
      }
      if(this.items[i].TendmViTri !== null){
        if(this.items[i].TendmViTri.toLowerCase().includes(this.filter.KeyWord))
        {
          items.push(this.items[i]);
          continue;
        }
      }
    }
    this.item.listItem = items;
  }
  GetQuyTrinhRefresh()
  {
    this.filter.KeyWord = '';
    this.item.listItem = this.items;
  }
}
