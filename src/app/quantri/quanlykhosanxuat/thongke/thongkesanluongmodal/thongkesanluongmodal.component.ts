import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { LohangComponent } from '../lohang/lohang.component';

@Component({
  selector: 'app-thongkesanluongmodal',
  templateUrl: './thongkesanluongmodal.component.html',
  styleUrls: ['./thongkesanluongmodal.component.css']
})
export class ThongkesanluongmodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi:true,
    KhongDuyet:false,
    ChuyenTiep:false,
    Xoa:false,
  }
  listCongDoan:any=[];
  listCaSanXuat:any=[];
  listPhanXuong: any = [];
  listItem: any = [];
  editTableItem: any = {};
  lang: any = vn;
  listLoHang: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    this.getListCongDoan();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    else{
      this.KiemTraButtonModal();
      this.item.CongDoan = this.listCongDoan[0]
      this.getItemTheoCongDoan();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
    this.getListPhanXuong();
    this.getListCaSanXuat();
    this.getListLoHang();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenDuyet() {
    if (this.item.IdLoHang === null || this.item.IdLoHang === undefined) {
      this.toastr.error("Bạn chưa chọn  lô hàng cho công đoạn Ống");
    }
    else{
      this.item.listItem.forEach(element => {
        element.IdLoHang = this.item.IdLoHang
      });
      this.services.ThongKeSanLuong().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
 
  GetNextSoQuyTrinh() {
    this.services.ThongKeSanLuong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  GhiLai() {
    if (this.item.IdLoHang === null || this.item.IdLoHang === undefined) {
      this.toastr.error("Bạn chưa chọn  lô hàng cho công đoạn Ống");
    }
    else{
      debugger
      this.item.listItem.forEach(element => {
        element.IdLoHang = this.item.IdLoHang
      });
      this.services.ThongKeSanLuong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.ThongKeSanLuong().Delete(this.item).subscribe((res: any) => {
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
    }
  }
  getListCongDoan() {
    this.services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
  getListCaSanXuat() {
    this.services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getMatHangThongKeSanLuong() {
    if(this.item.IddmCaSanXuat != undefined
      && this.item.IddmPhanXuong != undefined
      && this.item.Ngay != undefined){

        this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;

        if(this.item.listItem != undefined && this.item.listItem != null){
          this.item.listItem.forEach(element => {
          if(element.Id !== null && element.Id !== undefined)
              element.isXoa = true
            });
        }
        this.services.ThongKeSanLuong().GetMatHang(this.item.IddmPhanXuong,this.item.IddmCaSanXuat, this.item.NgayUnix).subscribe((res: any) => {
          res.forEach(element => {
            element.Id = null;
          });
          this.item.listItem = res;
        })
      }
  }
  editChiTiet(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  
  saveEdit(item, index){
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
  }
  cancelEdit(item, index){
    this.item.listItem[index].editField = false;
  }
  TinhGiaTri(item, event) {
    var KhoiLuong = 0;
    if(item.Ne !== undefined && item.Ne !== null && item.Ne !== 0 && event !== undefined)
      KhoiLuong = event/item.Ne;
    return KhoiLuong;
  }
  onClose(){
    this.activeModal.close();
  }
  getListLoHang() {
    var data={
      CurrentPage:0
    }
    this.services.LoHang().GetList(data).subscribe((res: any) => {
      this.listLoHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  addLoHang(){
    let data = {
      CurrentPage: 0,
      Loai: 1,
    };
    this.services.GetListdmItem(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(LohangComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.lstSanPham;
      modalRef.result.then((data) => {
        this.getListLoHang();
        });
      }, (reason) => {
        // không
      });
  }
  getItemTheoCongDoan() {
    if(this.item.CongDoan != undefined && this.item.listItem != undefined  && this.item.listItem != null)
    {
      this.listItem = []
      this.item.listItem.forEach(element => {
        if(element.CongDoan === this.item.CongDoan)
          this.listItem.push(element);
      }
    )}
  }
  TinhSoQuaSoi(item, event) {
    if(item.KhoiLuong !== undefined && item.KhoiLuong!== null)
    {
      if(event === 0 && item.KgCone !== 0 && item.KhoiLuong!== null)
        item.SoQuaSoi =item.KhoiLuong/item.KgCone;
      else if(event !== 0 && event.value !== 0 && event.value !== null)
        item.SoQuaSoi =item.KhoiLuong/event.value;
    }
  }
}
