import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { CVMic, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChonkienbonghoimodalComponent } from '../chonkienbonghoimodal/chonkienbonghoimodal.component';
import { ChonkienbongmodalComponent } from '../chonkienbongmodal/chonkienbongmodal.component';

@Component({
  selector: 'app-timbongmodal',
  templateUrl: './timbongmodal.component.html',
  styleUrls: ['./timbongmodal.component.css']
})
export class TimbongmodalComponent implements OnInit {
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
  itemSoKienTrenBanTruBongHoi = {};
  item: any = {
    Id: '',
    listItem: [],
    listLoBong: []
  };
  ghostItem: any = {};
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
  itemGiaTrungBinh: any = {};
  itemTrongLuong1Ban: any = {};
  ThongSoKienTheoLoaiBong: any = {

  };
  trongLuongLoBong: any = {};
  itemDeltaPlusB: any = {};
  itemMicTT: any = {};

  PoolLoBong: any = {

  }
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false
    }
    this.KiemTraButtonModal();
    this.GetListTrienKhaiKeHoach()
  }
  GetListTrienKhaiKeHoach() {
    let data = {
      CurrentPage: 0,
    }
    this._services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.listTrienKhaiKeHoach = mapArrayForDropDown(res, 'SoQuyTrinh', "Id")
      if (validVariable(this.item.IdTrienKhaiKeHoachSanXuat)) {
        // this.GetChiTietTrienKhaiKeHoachForMatHang({ value: this.item.IdTrienKhaiKeHoachSanXuat });
      }
      if (validVariable(this.item.SoBanBong) && this.item.SoBanBong !== 0) {
        this.item.listLoBong.forEach((lobong, index) => {
          if (!validVariable(lobong.temBanBong)) {
            lobong.tempBanBong = {};
          }
          lobong.listItem.forEach((item) => {
            let data = {
              ...item,
              listItem: (validVariable(item.listItem) && item.listItem?.length !== 0) ? item.listItem : [],
              SoKien: item.SoLuongKien,
              tabIndex: index + 1 + (item.ThuTu * this.item.listLoBong.length)
            }
            lobong.tempBanBong[`${item.ThuTu}`] = data;
          });
          // if(!validVariable(this.PoolLoBong[`${lobong.IdLoBong.split('-').join('_')}`])){
          //   this.PoolLoBong[`${lobong.IdLoBong.split('-').join('_')}`] = []
          // }
          // this._services.TimBong().GetListKienBong(lobong.IdLoBong).subscribe(res=>{
          //   console.log(res)
          // })
        });
        this.listProps = [];
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          this.listProps.push(`${i}`);
        }
        this.GetPoolKienBong();
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
        }
        for (let chatluong in TongChatLuong) {
          this.ChatLuongBinhQuan[chatluong] = TongChatLuong[chatluong] / (this.item.listLoBong.length - this.item.listLoBong.filter(ele => !validVariable(ele[chatluong])).length);
        }
        this.labelBong = {}
        this.item.listLoBong.forEach(lobong => {
          if (!validVariable(this.labelBong[lobong.MadmLoaiBong])) {
            this.labelBong[lobong.MadmLoaiBong] = 0;
          }
          if (validVariable(lobong.TyLe)) {
            this.labelBong[lobong.MadmLoaiBong] += lobong.TyLe;
          }
        });
        this.labelBong.Hoi = 100 - (this.labelBong.BR + this.labelBong.M + this.labelBong.TP);
        for (let i = 0; i < this.item.listLoBong.length; i++) {
          for (let j = 1; j <= this.item.SoBanBong; j++) {
            this.CalAllTable(i, `${j}`);
          }
        }
        if (validVariable(this.item.listThongSo)) {
          this.item.listThongSo.forEach(thongso => {
            this.itemMicTT[`${thongso.ThuTu}`] = thongso.MicTT;
          });
        }
      }
    })
  }
  GetPoolKienBong() {
    if (validVariable(this.item.listLoBong)) {
      this._services.TimBong().GetListKienBong(this.item.listLoBong.map(lobong => lobong.IdLoBong)).subscribe((res: any) => {
        this.PoolLoBong={
          BongHoi:[]
        }
        res.forEach(kien => {
          if (validVariable(kien.IdLoBong)) {
            if (!validVariable(this.PoolLoBong[`${kien.IdLoBong.split('-').join('_')}`])) {
              this.PoolLoBong[`${kien.IdLoBong.split('-').join('_')}`] = []
            }
            this.PoolLoBong[`${kien.IdLoBong.split('-').join('_')}`].push(kien);
          }else{
            this.PoolLoBong.BongHoi.push(kien);
          }
        });
        console.log(this.PoolLoBong);
      })
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
    this.labelBong.Hoi = 100 - (this.labelBong.BR + this.labelBong.M + this.labelBong.TP);
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
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (validVariable(this.item.listLoBong[y].tempBanBong[`${i}`].SoKien)) {
        tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
        if (tempSLD > this.item.listLoBong[y].SoLuongKien) {
          this._toastr.warning('Bạn vừa nhập quá số lượng kiện tồn trong kho! Chúng tôi sẽ điều chỉnh về giá trị lớn nhất có thể tránh gây lỗi nghiêm trọng!')
          tempSLD -= this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
          this.item.listLoBong[y].tempBanBong[`${i}`].SoKien = this.item.listLoBong[y].SoLuongKien - tempSLD;
          tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
        }
      }
    }
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.tempBanBong[`${x}`].SoKien)) {
        tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
        if (tempSoKien1Line > this.item.TongSoKien) {
          this._toastr.warning('Bạn vừa nhập quá số lượng kiện bông trên 1 bàn bông! Chúng tôi sẽ điều chỉnh về giá trị lớn nhất có thể tránh gây lỗi nghiêm trọng!')
          tempSoKien1Line -= lobong.tempBanBong[`${x}`].SoKien;
          lobong.tempBanBong[`${x}`].SoKien = this.item.TongSoKien - tempSoKien1Line;
          tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
        }
      }
    });
    tempSLD = 0;
    tempSoKien1Line=0;
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
    this.trongLuongLoBong.Hoi = this.TongKhoiLuongDung - (this.trongLuongLoBong.BR + this.trongLuongLoBong.M + this.trongLuongLoBong.TP);
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
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].TonCuoi += lobong.TonCuoi;
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].SoLuongDung += lobong.SoLuongDung;
      this.ThongSoKienTheoLoaiBong[lobong.MadmLoaiBong].Mau = lobong.Mau;
    });
  }
  chonKienBong(IdLoBong, y, x) {
    if(validVariable(IdLoBong)){
      let modalRef = this._modal.open(ChonkienbongmodalComponent, {
        size: 'xl'
      })
      modalRef.componentInstance.items = this.PoolLoBong[`${IdLoBong.split('-').join('_')}`];
      modalRef.componentInstance.selectedItems = this.item.listLoBong[y].tempBanBong[`${x}`].listItem;
      modalRef.componentInstance.maxSelected = this.item.listLoBong[y].tempBanBong[`${x}`].SoKien;
      modalRef.componentInstance.resultMic = this.itemMicBQ[`${x}`];
      modalRef.componentInstance.TenLoBong = this.item.listLoBong[y].Ma;
      modalRef.result.then((res) => {
        console.log(this.item.listLoBong[y].tempBanBong[`${x}`].listItem);
      })
    }else{
      let modalRef = this._modal.open(ChonkienbonghoimodalComponent, {
        size: 'xl'
      })
      modalRef.componentInstance.items = this.PoolLoBong.BongHoi;
      modalRef.componentInstance.selectedItems = this.item.listLoBong[y].tempBanBong[`${x}`].listItem;
      modalRef.componentInstance.maxSelected = this.item.listLoBong[y].tempBanBong[`${x}`].SoKien;
      // modalRef.componentInstance.resultTrongLuong = this.itemMicBQ[`${x}`];
      modalRef.componentInstance.resultTrongLuong = this.item.listLoBong[y].TrongLuong;
      modalRef.componentInstance.TenLoBong = this.item.listLoBong[y].Ma;
      modalRef.result.then((res) => {
        console.log(this.item.listLoBong[y].tempBanBong[`${x}`].listItem);
      })
    }
  }
  SetData() {
    this.item.listLoBong.forEach(lobong => {
      // if (!validVariable(lobong.listItem)) {
      lobong.listItem = [];
      // }
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        console.log(lobong.tempBanBong[`${i}`].listItem)
        let data = {
          SoLuongKien: lobong.tempBanBong[`${i}`].SoKien,
          ThuTu: i,
          listItem: lobong.tempBanBong[`${i}`].listItem
        };
        lobong.listItem.push(data)
      }
    });
    return {
      ...this.ghostItem,
      PhuongAnPhaBong: this.item
    }
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.ghostItem.Id || '', this.ghostItem.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  GhiLai() {
    this._services.TimBong().Set(this.SetData()).subscribe((res: any) => {
      console.log(res);
      if (res) {
        if (res.State === 1) {
          this._toastr.success(res.message);
          this.opt = 'edit';
          res.objectReturn.PhuongAnPhaBong.listLoBong.forEach(lobong => {
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
          this.item = res.objectReturn.PhuongAnPhaBong;
          res.objectReturn.PhuongAnPhaBong = undefined;
          this.ghostItem = res.objectReturn;
          this.KiemTraButtonModal();
        } else {
          this._toastr.error(res.message);
        }
      }
    });
  }
  ChuyenDuyet() {
    this._services.TimBong().ChuyenTiep(this.SetData()).subscribe((res: any) => {
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
  TimBongTuDong() {
    this._services.TimBong().TimBongTuDong(this.ghostItem.Id).subscribe((res: any) => {
      if (res.State === 1) {
        this._toastr.success('Cập nhật dữ liệu thành công!');
        this.GetPhuongAn()
      } else {
        this._toastr.error(res.message);
      }
    })
  }
  GetPhuongAn() {
    this._services.TimBong().Get(this.ghostItem.Id).subscribe((res: any) => {
      this.item = deepCopy(res.PhuongAnPhaBong);
      res.PhuongAnPhaBong = undefined;
      this.ghostItem = deepCopy(res)
      this.GetListTrienKhaiKeHoach()
    })
  }
}
