import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImportdanhmucmodelComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-thongsochatluongmodal',
  templateUrl: './thongsochatluongmodal.component.html',
  styleUrls: ['./thongsochatluongmodal.component.css']
})
export class ThongsochatluongmodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  item_new: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listItem = [];
  newTableItem: any = {};
  listLoBong: any = [];
  data: any = {};
  lang: any = vn;
  editTableItem:any={};
  paging: any = {};
  Id = "";
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private services: SanXuatService) {
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    else{
        this.GetQuyTrinh();
    }

    this.data.CurrentPage = 0;
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = new Date(this.item.NgayUnix * 1000);
      }
    this.getListLoBong();
  }
  GetQuyTrinh()
  {
    this.services.PhieuNhapLoBong_ChatLuong().Get(this.Id).subscribe((res1:any)=>{
      this.item = res1;
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = new Date(this.item.NgayUnix * 1000);
      }
      this.listItem = res1.listItem;
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0,15);
      this.item_new = this.item;
        this.KiemTraButtonModal();
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  SetData(){
    console.log(this.item)
    if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
    this.item_new.TrongLuong = this.item.TrongLuong;
    this.item_new.listItem = this.listItem;
    return this.item_new;
  }
  ChuyenDuyet() {
    this.services.PhieuNhapLoBong_ChatLuong().ChuyenTiep(this.SetData()).subscribe((res: any) => {
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
    this.services.PhieuNhapLoBong_ChatLuong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  
  GhiLai() {
    this.services.PhieuNhapLoBong_ChatLuong().Set(this.SetData()).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message)
          this.opt = 'edit';
          this.item = res.objectReturn;
          this.listItem = res.objectReturn.listItem;
          this.paging.CurrentPage = 1;
          this.paging.TotalPage = 5;
          if(res.objectReturn.listItem != undefined && res.objectReturn.listItem != null)
            this.paging.TotalItem = res.objectReturn.listItem.length;
          this.item.listItem = res.objectReturn.listItem.slice(0,15);

          this.KiemTraButtonModal();
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
      this.services.PhieuNhapLoBong_ChatLuong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
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
      console.log(this.listItem)
    }
  }
  getListLoBong() {
    this.services.GetListLoBong(this.data).subscribe((res: any) => {
      this.listLoBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  importExcel(){
    let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.Name = 'PhieuNhapLoBong_ChatLuong';
    modalRef.componentInstance.data = this.item;
    modalRef.result.then(res=>{
      this.toastr.success('Cập nhật thành công!');
      this.GetQuyTrinh();
      // this.services.PhieuNhapLoBong_ChatLuong().Get(this.item.Id).subscribe((res: any) => {
      //   this.item = res;
      // })
    })
    .catch(er=>console.log(er))
  }
  onClose(){
    this.activeModal.close();
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end =  start + 15;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listItem = this.listItem.slice(start,end);
  }
  importExcelMic(){
    let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.Name = 'PhieuNhapLoBong_ChatLuong';
    modalRef.componentInstance.data = this.item;
    modalRef.componentInstance.Loai = 'MIC';
    modalRef.result.then(res=>{
      // this.toastr.success(res.message);
      this.toastr.success('Cập nhật thành công!');
      this.GetQuyTrinh();
    })
    .catch(er=>console.log(er))
  }
  exportExcelMau(Loai){
    this.services.PhieuNhapLoBong_ChatLuong().exportExcelMau(Loai).subscribe((res: any) => {
      this.services.download(res.TenFile);
    })
  }
}
