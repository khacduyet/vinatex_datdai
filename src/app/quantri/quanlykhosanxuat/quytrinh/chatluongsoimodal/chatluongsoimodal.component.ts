import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-chatluongsoimodal',
  templateUrl: './chatluongsoimodal.component.html',
  styleUrls: ['./chatluongsoimodal.component.css']
})
export class ChatluongsoimodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listdmKho: any = [];
  editTableItem: any = {};
  newTableItem: any = {};
  filter: any = {};
  listdmPhanXuong: any = [];
  lang: any = vn;
  lstSanPham: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.getDanhSachChiTieuChatLuong();
    }
    else
      this.KiemTraButtonModal();
    if (this.item.NgayKiemTraUnix !== null && this.item.NgayKiemTraUnix !== undefined) {
      this.item.NgayKiemTra = new Date(this.item.NgayKiemTraUnix * 1000);
    }
    if (this.item.TuNgayUnix !== null && this.item.TuNgayUnix !== undefined) {
      this.item.TuNgay = new Date(this.item.TuNgayUnix * 1000);
    }
    if (this.item.DenNgayUnix !== null && this.item.DenNgayUnix !== undefined) {
      this.item.DenNgay = new Date(this.item.DenNgayUnix * 1000);
    }
    this.getListdmPhanXuong();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.item.NgayKiemTra !== null && this.item.NgayKiemTra !== undefined)
      this.item.NgayKiemTraUnix = (new Date(this.item.NgayKiemTra)).getTime() / 1000;
    if (this.item.TuNgay !== null && this.item.TuNgay !== undefined)
      this.item.TuNgayUnix = (new Date(this.item.TuNgay)).getTime() / 1000;
    if (this.item.DenNgay !== null && this.item.DenNgay !== undefined)
      this.item.DenNgayUnix = (new Date(this.item.DenNgay)).getTime() / 1000;
    this.services.PhieuChatLuongSoi().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  GetNextSoQuyTrinh() {
    this.services.PhieuChatLuongSoi().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.NgayKiemTra === null && this.item.NgayKiemTra === undefined)
      this.toastr.error("Bạn chưa chọn  ngày");
    else if (this.item.TuNgay === null && this.item.TuNgay === undefined)
      this.toastr.error("Bạn chưa chọn  ngày");
    else if (this.item.DenNgay === null && this.item.DenNgay === undefined)
      this.toastr.error("Bạn chưa chọn  ngày");
    else {
      this.item.NgayKiemTraUnix = (new Date(this.item.NgayKiemTra)).getTime() / 1000;
      this.item.TuNgayUnix = (new Date(this.item.TuNgay)).getTime() / 1000;
      this.item.DenNgayUnix = (new Date(this.item.DenNgay)).getTime() / 1000;
      this.services.PhieuChatLuongSoi().Set(this.item).subscribe((res: any) => {
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
      this.services.PhieuChatLuongSoi().Delete(this.item).subscribe((res: any) => {
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

  GetMatHangTheoKho() {
    let data = {
      IddmPhanXuong: this.item.IddmPhanXuong,
      Ngay: new Date(this.item.NgayKiemTra).getTime() / 1000,
      TuNgay: new Date(this.item.TuNgay).getTime() / 1000,
      DenNgay: new Date(this.item.DenNgay).getTime() / 1000,
    };
    this.services.GetlistdmMatHangKiemTraChatLuong(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.lstSanPham;
      modalRef.componentInstance.cols = [{
          header: 'Tên lô hàng',
          field: 'TenLoHang',
          width: 'unset'
        },
        {
          header: 'Tên mặt hàng',
          field: 'Ten',
          width: 'unset'
        },
        // {
        //   header: 'Tên mặt hàng',
        //   field: 'Ten',
        //   width: 'unset'
        // },
      ];

      modalRef.result.then((data) => {
        this.lstSanPham = data.data;
        this.item.lstDanhMuc.forEach(element => {
          let chatluongpush = [];
          console.log(this.lstSanPham)
          this.lstSanPham.forEach(danhmuc => {
            let datapush: any = {
              IddmChiTieu: element.Id,
              IddmItem: danhmuc.IddmItem,
              IdLoHang: danhmuc.IdLoHang,
              ChiTieuLyThuyet:danhmuc.lstChiTieuTieuChuan.find(chitieumathang=>chitieumathang.idChiTieu===element.Id)?.TieuChuan
            }
            for (let i = 0; i < element.lstChatLuongSanPham.length; i++) {
              if (element.lstChatLuongSanPham[i].IddmItem === danhmuc.Id) {
                datapush.ChiTieuThucTe = element.lstChatLuongSanPham[i].ChiTieuThucTe;
                // datapush.IdLoHang = element.lstChatLuongSanPham[i].IdLoHang;
                break;
              }
            }
            chatluongpush.push(datapush);
          });
          element.lstChatLuongSanPham = chatluongpush;
        });
        //
        let sanphampush = [];
        this.lstSanPham.forEach(danhmuc => {
          let datapush: any = {
            IddmItem: danhmuc.IddmItem,
            Ten: danhmuc.Ten,
          }
          sanphampush.push(datapush);
        });
        this.item.lstSanPham = sanphampush;
      }, (reason) => {
        // không
      });
    })
  }
  getListKho() {
    var data: any = {}
    data.Loai = 10;
    data.CurrentPage = 0;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getDanhSachChiTieuChatLuong() {
    let data = {
      CurrentPage: 0,
      KeyWord: "",
    }
    this.services.GetDanhSachChiTieuChatLuong(data).subscribe((res: any) => {
      this.item.lstDanhMuc = res;
    })
  }
  Onclose() {
    this.activeModal.close();
  }
  test(){
    console.log(this.item.lstDanhMuc)
  }
}
