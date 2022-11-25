import { formatNumber } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ignoreElements } from 'rxjs/operators';
import { TinhtrangtaisanComponent } from 'src/app/quantri/danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { CVMic, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';

@Component({
  selector: 'app-phabongmodal',
  templateUrl: './phabongmodal.component.html',
  styleUrls: ['./phabongmodal.component.css'],
})
export class PhabongmodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  listBanBong: any = [];
  listTrienKhaiKeHoach: any = [];
  listItems: any = [];
  listProps: any = [];
  listCol: any = [];
  listFixedCol: any = [];
  editVal: any = 0;
  checkbutton: any = {};
  opt: any = '';
  listLoBong: any = [];
  itemSoKienTrenBan = {};
  itemMicBQ = {};
  itembBQ = {};
  itemCVMic = {};
  itemGiaTrungBinh: any = {};
  itemTrongLuong1Ban: any = {};
  itemDeltaPlusB: any = {};
  itemSoKienTrenBanTruBongHoi = {};
  item: any = {
    Id: '',
    listItem: [],
    listLoBong: []
  };
  TongKhoiLuongDung: any = null;
  TongTyLe: number = 100;
  itemTrienKhaiKeHoach: any = {};
  ChatLuongBinhQuan: any = {
    Rd: 0,
    Mic: 0,
    b: 0
  }
  labelBong: any = {
  }
  ThongSoKienTheoLoaiBong: any = {

  };
  trongLuongLoBong: any = {};
  itemMicTT: any = {};

  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal, private zone: NgZone, private changeDec: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false
    }
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      // this.GetLoBongTrongKho();
    }
    this.GetListTrienKhaiKeHoach()
  }
  GetListTrienKhaiKeHoach() {
    let data = {
      CurrentPage: 0,
    }
    this._services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.listTrienKhaiKeHoach = mapArrayForDropDown(res, 'NoiDung', "Id")
      if (validVariable(this.item.IdTrienKhaiKeHoachSanXuat)) {
        this.GetChiTietTrienKhaiKeHoachForMatHang({ value: this.item.IdTrienKhaiKeHoachSanXuat });
      }
      if (validVariable(this.item.SoBanBong) && this.item.SoBanBong !== 0) {
        this.listProps = [];
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          this.listProps.push(`${i}`);
        }
        this.item.listLoBong.forEach((lobong, index) => {
          if (!validVariable(lobong.temBanBong)) {
            lobong.tempBanBong = {};
          }
          lobong.listItem.forEach((item) => {
            let data = {
              ...item,
              SoKien: item.SoLuongKien,
              tabIndex: index + 1 + (item.ThuTu * this.item.listLoBong.length)
            }
            lobong.tempBanBong[`${item.ThuTu}`] = data;
          });
        });
        let TongChatLuong = {
          Mic: 0,
          Rd: 0,
          b: 0,
          Mat: 0,
          Str: 0,
          Tap: 0,
          Am: 0,
          UHML: 0
        }
        this.item.listLoBong.forEach(lobong => {
          for (let chatluong in TongChatLuong) {
            if (validVariable(lobong[chatluong])) {
              TongChatLuong[chatluong] += lobong[chatluong];
            }
          }
        });
        this.ChatLuongBinhQuan = {
          // Mic: TongChatLuong.Mic / res.length,
          // Rd: TongChatLuong.Rd / res.length,
          // b: TongChatLuong.b / res.length,
        }
        for (let chatluong in TongChatLuong) {
          this.ChatLuongBinhQuan[chatluong] = TongChatLuong[chatluong] / (this.item.listLoBong.length - this.item.listLoBong.filter(ele => !validVariable(ele[chatluong])).length);
        }
        this.labelBong = {}
        this.trongLuongLoBong = {}
        this.item.listLoBong.forEach(lobong => {
          if (!validVariable(this.labelBong[lobong.MadmLoaiBong])) {
            this.labelBong[lobong.MadmLoaiBong] = 0;
          }
          if (validVariable(lobong.TyLe)) {
            this.labelBong[lobong.MadmLoaiBong] += lobong.TyLe;
          }
        });
        this.labelBong.Hoi = 100 - (this.labelBong.BR + this.labelBong.M + this.labelBong.TP);
        this.item.TyLePhaBong = `${formatNumber(this.labelBong.BR, 'vi-VN', '0.0-1')}% Brazil + ${formatNumber(this.labelBong.M, 'vi-VN', '0.0-1')}% Mỹ + ${formatNumber(this.labelBong.TP, 'vi-VN', '0.0-1')}% Tây Phi + ${formatNumber(this.labelBong.Hoi, 'vi-VN', '0.0-1')}% Hồi`
        for (let i = 0; i < this.item.listLoBong.length; i++) {
          for (let j = 1; j <= this.item.SoBanBong; j++) {
            this.CalAllTable(i, `${j}`);
          }
        }
        this.TinhThongTinKienTheoLoaiBong();
        if (validVariable(this.item.listThongSo)) {
          this.item.listThongSo.forEach(thongso => {
            this.itemMicTT[`${thongso.ThuTu}`] = thongso.MicTT;
          });
        }
      }
    })
  }
  GetChiTietTrienKhaiKeHoachForMatHang(event) {
    this._services.TrienKhaiKeHoachSanXuat().Get(event.value, false).subscribe((res: any) => {
      console.log(res);
      // res.listItem.forEach(mathang => {
      //   mathang.KhoiLuongSanXuat = mathang.KhoiLuongSanXuat / 1000;
      // });
      this.itemTrienKhaiKeHoach = res;
      this.GetLoBongTrongKho();
    })
  }
  GetLoBongTrongKho() {
    this._services.PhuongAnPhaBong().GetLoBongTrongKho(this.itemTrienKhaiKeHoach.IdDuAn).subscribe((res: any) => {
      this.listLoBong = res;
    })
  }
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.items = this.itemTrienKhaiKeHoach.listItem || [];
    modalRef.componentInstance.selectedItems = this.item.listItem || [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.componentInstance.opt = "KhoiLuongSanXuat";
    modalRef.result.then(res => {
      this.item.listItem = res;
      let data = {
        listItem: res,
        IdDuAn: this.itemTrienKhaiKeHoach.IdDuAn,
        IddmPhanXuong: this.itemTrienKhaiKeHoach.IddmPhanXuong
      }
      this._services.PhuongAnPhaBong().TinhKhoiLuongBong(data).subscribe((result: any) => {
        if (result.State === 1) {
          this.item.KhoiLuongBong = parseFloat(result.message);
          if (validVariable(this.item.TongSoKien)) {
            this.TinhSoBanBong({ value: this.item.TongSoKien });
          }
        } else {
          this._toastr.error(result.message);
        }
      })
    })
      .catch(er => {
        console.log(er);
      })
  }
  chonLoBong() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.items = this.listLoBong || [];
    modalRef.componentInstance.selectedItems = this.item.listLoBong || [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.componentInstance.opt = "LoBong";
    modalRef.result.then(res => {
      this.item.listLoBong = res;
      if (res.length > 0) {
        let TongKhoiLuong = res.reduce((sum, ele) => {
          return sum + ele.TrongLuong
        }, 0)
        this.item.KhoiLuongKienTrungBinh = TongKhoiLuong / (res.length);
        let TongChatLuong = {
          Mic: 0,
          Rd: 0,
          b: 0,
          Mat: 0,
          Str: 0,
          Tap: 0,
          Am: 0,
          UHML: 0
        }
        this.item.listLoBong.forEach(lobong => {
          for (let chatluong in TongChatLuong) {
            if (validVariable(lobong[chatluong])) {
              TongChatLuong[chatluong] += lobong[chatluong];
            }
          }
        });
        this.ChatLuongBinhQuan = {
          // Mic: TongChatLuong.Mic / res.length,
          // Rd: TongChatLuong.Rd / res.length,
          // b: TongChatLuong.b / res.length,
        }
        for (let chatluong in TongChatLuong) {
          this.ChatLuongBinhQuan[chatluong] = TongChatLuong[chatluong] / (this.item.listLoBong.length - this.item.listLoBong.filter(ele => !validVariable(ele[chatluong])).length);
        }
      }
      if (validVariable(this.item.TongSoKien)) {
        this.TinhSoBanBong({ value: this.item.TongSoKien });
      }
    })
      .catch(er => {
        console.log(er);
      })
  }
  TinhSoBanBong(e?) {
    console.log(this.item.KhoiLuongKienTrungBinh);
    // console.log(this.item.TongSoKien);
    // this.item.TongSoKien = e.value;
    if (validVariable(this.item.KhoiLuongBong) && validVariable(this.item.TongSoKien) && validVariable(this.item.KhoiLuongKienTrungBinh)) {
      this.item.SoBanBong = Math.ceil(this.item.KhoiLuongBong / (this.item.TongSoKien * this.item.KhoiLuongKienTrungBinh));
      this.listProps = [];
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        this.listProps.push(`${i}`);
      }
      this.item.listLoBong.forEach((lobong, index) => {
        lobong.tempBanBong = {};
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          lobong.tempBanBong[`${i}`] = {
            SoKien: null,
            tabIndex: ((i - 1) * this.item.listLoBong.length) + index + 1
          };
        }
      })
      this.itemSoKienTrenBan = {};
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        this.itemSoKienTrenBan[`${i}`] = null;
      }
      this.voiPintable.active();
    }
  }
  TinhTyLeTong() {
    this.labelBong = {}
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.labelBong[lobong.MadmLoaiBong])) {
        this.labelBong[lobong.MadmLoaiBong] = 0;
      }
      if (validVariable(lobong.TyLe)) {
        this.labelBong[lobong.MadmLoaiBong] += lobong.TyLe;
      }
    });
    this.labelBong.Hoi = 100 - (this.labelBong.BR + this.labelBong.M||0 + this.labelBong.TP);
    this.item.TyLePhaBong = `${formatNumber(this.labelBong.BR, 'vi-VN', '0.0-1')}% Brazil + ${formatNumber(this.labelBong.M, 'vi-VN', '0.0-1')}% Mỹ + ${formatNumber(this.labelBong.TP, 'vi-VN', '0.0-1')}% Tây Phi + ${formatNumber(this.labelBong.Hoi, 'vi-VN', '0.0-1')}% Hồi`
  }
  TinhTongTrongLuong() {
    this.trongLuongLoBong = {};
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.trongLuongLoBong[lobong.MadmLoaiBong])) {
        this.trongLuongLoBong[lobong.MadmLoaiBong] = 0;
      }
      if (validVariable(lobong.TyLe)) {
        this.trongLuongLoBong[lobong.MadmLoaiBong] += lobong.TongTrongLuong;
      }
    });
    this.trongLuongLoBong.Hoi = this.TongKhoiLuongDung - (this.trongLuongLoBong.BR + this.trongLuongLoBong.M||0 + this.trongLuongLoBong.TP);
  }
  TinhDeltaB() {
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      this.itembBQ[`${i}`] = Math.round(this.itembBQ[`${i}`] * 100) / 100;
    }
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (i === 1) {
        this.itemDeltaPlusB[`${i}`] = 0;
      } else {
        this.itemDeltaPlusB[`${i}`] = (this.itembBQ[`${i}`] - this.itembBQ[`${i - 1}`]);
      }
    }
  }
  TinhThongTinKienTheoLoaiBong() {
    this.ThongSoKienTheoLoaiBong = {};
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong])) {
        this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong] = {
          TonDau: 0,
          TonCuoi: 0,
          SoLuongDung: 0,
          Mau: null
        }
      }
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].TonDau += lobong.SoLuongKien;
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].TonCuoi += lobong.TonCuoi ? lobong.TonCuoi : 0;
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].SoLuongDung += lobong.SoLuongDung ? lobong.SoLuongDung : 0;
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].Mau = lobong.Mau;
    });
  }
  TinhLuyKeTyLeBong() {
    for (let i = 1; i < this.item.listLoBong.length; i++) {
      let tempLK = 0
      for (let j = 0; j <= i; j++) {
        if (validVariable(this.item.listLoBong[j].TyLe)) {
          tempLK += this.item.listLoBong[j].TyLe;
        }
      }
      this.item.listLoBong[i].LuyKeTyLe = tempLK;
    }
  }
  CalAllTable(y, x) {
    let tempSLD = 0;
    let tempSoKien1Line = 0;
    let tempSoKien1LineTruBongHoi = 0;
    let tempTongCLMic = 0;
    let tempTongCLRd = 0;
    let tempTongCLb = 0;
    let tempTongGia = 0;
    let tempTongTrongLuong = 0;
    let tempTongKhoiLuongDung = 0;
    let arrayMic = [];
    let arrayKien = [];
    console.log(this.item.listLoBong[y].tempBanBong[`${x}`].SoKien)
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (validVariable(this.item.listLoBong[y].tempBanBong[`${i}`].SoKien) && i !== parseInt(x)) {
        tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
      }
    }
    this.item.listLoBong.forEach((lobong, index) => {
      if (validVariable(lobong.tempBanBong[`${x}`].SoKien) && index !== y) {
        tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
      }
    });
    if (tempSLD + this.item.listLoBong[y].tempBanBong[`${x}`].SoKien > this.item.listLoBong[y].SoLuongKien) {
      this._toastr.warning('Bạn vừa nhập quá số lượng kiện tồn trong kho! Chúng tôi sẽ điều chỉnh về 0 tránh gây lỗi nghiêm trọng!');
      // this.zone.run(() => {
        this.item.listLoBong[y].tempBanBong[`${x}`].SoKien = null;
      // })
      // this.changeDec.detectChanges();
    }
    if (tempSoKien1Line + this.item.listLoBong[y].tempBanBong[`${x}`].SoKien > this.item.TongSoKien) {
      this._toastr.warning('Bạn vừa nhập quá số lượng kiện bông trên 1 bàn bông! Chúng tôi sẽ điều chỉnh về 0 tránh gây lỗi nghiêm trọng!')
      // this.zone.run(() => {
        this.item.listLoBong[y].tempBanBong[`${x}`].SoKien = null;
      // })
      // this.changeDec.detectChanges();
    }
    tempSLD = 0;
    tempSoKien1Line = 0;
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (validVariable(this.item.listLoBong[y].tempBanBong[`${i}`].SoKien)) {
        tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
      }
    }
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.tempBanBong[`${x}`].SoKien)) {
        tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
        tempTongTrongLuong += (lobong.tempBanBong[`${x}`].SoKien * lobong.TrongLuong);
        tempTongGia += (lobong.tempBanBong[`${x}`].SoKien * lobong.GiaBong * lobong.TrongLuong);
        if (validVariable(lobong.Mic)) {
          tempSoKien1LineTruBongHoi += lobong.tempBanBong[`${x}`].SoKien;
          tempTongCLMic += (lobong.tempBanBong[`${x}`].SoKien * lobong.Mic);
        }
        if (validVariable(lobong.b)) {
          tempTongCLb += (lobong.tempBanBong[`${x}`].SoKien * lobong.b);
        }
      }
    });
    this.item.listLoBong[y].SoLuongDung = tempSLD;
    this.item.listLoBong[y].TonCuoi = this.item.listLoBong[y].SoLuongKien - tempSLD;
    this.itemMicBQ[`${x}`] = tempTongCLMic / tempSoKien1LineTruBongHoi;
    this.itembBQ[`${x}`] = tempTongCLb / tempSoKien1LineTruBongHoi;
    this.itemSoKienTrenBan[`${x}`] = tempSoKien1Line > this.item.TongSoKien ? this.item.TongSoKien : tempSoKien1Line;
    this.itemSoKienTrenBanTruBongHoi[`${x}`] = tempSoKien1LineTruBongHoi;
    this.itemTrongLuong1Ban[`${x}`] = tempTongTrongLuong;
    this.itemGiaTrungBinh[`${x}`] = tempTongGia / tempTongTrongLuong;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        tempTongKhoiLuongDung += (lobong.SoLuongDung * lobong.TrongLuong);
      }
    });
    this.TongKhoiLuongDung = tempTongKhoiLuongDung;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        lobong.TyLe = (lobong.SoLuongDung * lobong.TrongLuong) / tempTongKhoiLuongDung * 100;
        lobong.TongTrongLuong = lobong.SoLuongDung * lobong.TrongLuong;
      }
      if (validVariable(lobong.Mic)) {
        arrayMic.push(lobong.Mic);
        arrayKien.push(validVariable(lobong.tempBanBong[`${x}`].SoKien) ? lobong.tempBanBong[`${x}`].SoKien : 0);
      }
    });
    this.itemCVMic[`${x}`] = CVMic([...arrayMic, ...arrayKien], tempSoKien1LineTruBongHoi);
    this.TinhTyLeTong();
    this.TinhTongTrongLuong()
    this.TinhDeltaB();
    this.TinhThongTinKienTheoLoaiBong();
    this.TinhLuyKeTyLeBong();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  ValidData() {
    if (!validVariable(this.item.IdTrienKhaiKeHoachSanXuat)) {
      this._toastr.error('Vui lòng chọn triển khai kế hoạch!')
      return false
    }
    if (!validVariable(this.item.TongSoKien) && this.item.TongSoKien <= 0) {
      this._toastr.error('Vui lòng nhập số kiện trên 1 bàn!')
      return false
    }
    if (!validVariable(this.item.listLoBong) || this.item.listLoBong.length === 0) {
      this._toastr.error('Vui lòng chọn lô bông!')
      return false
    }
    if (!validVariable(this.item.KhoiLuongBong)) {
      this._toastr.error('Vui lòng chọn mặt hàng!')
      return false
    }
    return true
  }
  SetData() {
    this.item.listLoBong.forEach(lobong => {
      // if (!validVariable(lobong.listItem)) {
      lobong.listItem = [];
      // }
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        let data = {
          SoLuongKien: lobong.tempBanBong[`${i}`].SoKien,
          ThuTu: i
        };
        lobong.listItem.push(data)
      }
    });

    this.item.listThongSo = [];
    for (let prop in this.itemMicBQ) {
      this.item.listThongSo.push({
        Mic: this.itemMicBQ[prop],
        ThuTu: prop
      })
    }
    return this.item;
  }
  GhiLai() {
    if (this.ValidData()) {
      this._services.PhuongAnPhaBong().Set(this.SetData()).subscribe((res: any) => {
        console.log(res);
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.opt = 'edit';
            res.objectReturn.listLoBong.forEach(lobong => {
              if (!validVariable(lobong.temBanBong)) {
                lobong.tempBanBong = {};
              }
              lobong.listItem.forEach(item => {
                let data = {
                  ...item,
                  SoKien: item.SoLuongKien
                }
                lobong.tempBanBong[`${item.ThuTu}`] = data;
              });
            });
            this.item = res.objectReturn;
            this.GetListTrienKhaiKeHoach();
            this.KiemTraButtonModal();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    }

  }
  ChuyenDuyet() {
    if (this.ValidData()) {
      this._services.PhuongAnPhaBong().ChuyenTiep(this.SetData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this._activeModal.close();
          } else {
            this._toastr.error(res.message);
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
      this._services.PhuongAnPhaBong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this._activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  GetNextSoQuyTrinh() {
    this._services.PhuongAnPhaBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  nextFocus(e) {
    console.log(e);
  }
  test() {
    console.log(this.itemGiaTrungBinh);
  }
}
