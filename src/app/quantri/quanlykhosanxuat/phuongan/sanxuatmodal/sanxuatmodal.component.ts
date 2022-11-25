import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable, CVMic, deepCopy } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-sanxuatmodal',
  templateUrl: './sanxuatmodal.component.html',
  styleUrls: ['./sanxuatmodal.component.css']
})
export class SanxuatmodalComponent implements OnInit {
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
  itemCheckBan = {};
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
        this.listProps = [];
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          this.listProps.push(`${i}`);
          this.itemCheckBan[`${i}`] = {
            checked: false,
            isDisabled: false
          };
        }
        if (validVariable(this.item.listCotDaXuat) && this.item.listCotDaXuat.length !== 0) {
          this.item.listCotDaXuat.forEach(cot => {
            this.itemCheckBan[`${cot}`] = {
              checked: true,
              isDisabled: true
            }
          });
        }
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
        // this.GetPoolKienBong();
        let TongChatLuong = {
          Mic: 0,
          Rd: 0,
          b: 0
        }
        this.item.listLoBong.forEach(lobong => {
          if (validVariable(lobong.Mic)) {
            TongChatLuong.Mic += lobong.Mic;
          }
          if (validVariable(lobong.Rd)) {
            TongChatLuong.Rd += lobong.Rd;
          }
          if (validVariable(lobong.b)) {
            TongChatLuong.b += lobong.b;
          }
        });
        this.ChatLuongBinhQuan = {
          Mic: TongChatLuong.Mic / res.length,
          Rd: TongChatLuong.Rd / res.length,
          b: TongChatLuong.b / res.length,
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
      }
    })
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
  CalAllTable(y, x) { //truc toa do y:tung x:hoanh
    let tempSLD = 0;
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (validVariable(this.item.listLoBong[y].tempBanBong[`${i}`].SoKien)) {
        tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
      }
    }
    this.item.listLoBong[y].SoLuongDung = tempSLD;
    this.item.listLoBong[y].TonCuoi = this.item.listLoBong[y].SoLuongKien - tempSLD;
    let tempSoKien1Line = 0;
    let tempSoKien1LineTruBongHoi = 0;
    let tempTongCLMic = 0;
    let tempTongCLRd = 0;
    let tempTongCLb = 0;
    let tempTongKhoiLuongDung = 0;
    let arrayMic = [];
    let arrayKien = [];
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.tempBanBong[`${x}`].SoKien)) {
        tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
        if (validVariable(lobong.Mic)) {
          tempSoKien1LineTruBongHoi += lobong.tempBanBong[`${x}`].SoKien;
          tempTongCLMic += (lobong.tempBanBong[`${x}`].SoKien * lobong.Mic);
        }
        if (validVariable(lobong.b)) {
          tempTongCLb += (lobong.tempBanBong[`${x}`].SoKien * lobong.b);
        }
      }
      if (validVariable(lobong.SoLuongDung)) {
        tempTongKhoiLuongDung += (lobong.SoLuongDung * lobong.TrongLuong);
      }
    });
    this.TongKhoiLuongDung = tempTongKhoiLuongDung;
    this.itemMicBQ[`${x}`] = tempTongCLMic / tempSoKien1LineTruBongHoi;
    this.itembBQ[`${x}`] = tempTongCLb / tempSoKien1LineTruBongHoi;
    this.itemSoKienTrenBan[`${x}`] = tempSoKien1Line;
    this.itemSoKienTrenBanTruBongHoi[`${x}`] = tempSoKien1LineTruBongHoi;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        lobong.TyLe = (lobong.SoLuongDung * lobong.TrongLuong) / tempTongKhoiLuongDung * 100;
      }
    });
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        lobong.TyLe = (lobong.SoLuongDung * lobong.TrongLuong) / tempTongKhoiLuongDung * 100;
      }
      if (validVariable(lobong.Mic)) {
        arrayMic.push(lobong.Mic);
        arrayKien.push(validVariable(lobong.tempBanBong[`${x}`].SoKien) ? lobong.tempBanBong[`${x}`].SoKien : 0);
      }
    });
    this.itemCVMic[`${x}`] = CVMic([...arrayMic, ...arrayKien], tempSoKien1LineTruBongHoi);
    this.TinhTyLeTong()
  }
  SetData() {
    // this.item.listLoBong.forEach(lobong => {
    //   // if (!validVariable(lobong.listItem)) {
    //   lobong.listItem = [];
    //   // }
    //   for (let i = 1; i <= this.item.SoBanBong; i++) {
    //     console.log(lobong.tempBanBong[`${i}`].listItem)
    //     let data = {
    //       SoLuongKien: lobong.tempBanBong[`${i}`].SoKien,
    //       ThuTu: i,
    //       listItem: lobong.tempBanBong[`${i}`].listItem
    //     };
    //     lobong.listItem.push(data)
    //   }
    // });
    // return {
    //   ...this.ghostItem,
    //   PhuongAnPhaBong: this.item
    // }
    let data = [];
    for (let prop in this.itemCheckBan) {
      if (this.itemCheckBan[prop].checked && !this.itemCheckBan[prop].isDisabled) {
        data.push(prop)
      }
    }
    return {
      Id: this.item.Id,
      IdPhuongAnSanXuat:this.ghostItem.Id,
      listCotXuat: data
    }
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.ghostItem.Id || '', this.ghostItem.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  GhiLai() {
    // this.SetData()
    this._services.SanXuat().Set(this.SetData()).subscribe((res: any) => {
      console.log(res);
      if (res) {
        if (res.State === 1) {
          this._toastr.success(res.message);
          this._services.SanXuat().Get(this.ghostItem.Id).subscribe((res: any) => {
            this.item = deepCopy(res.PhuongAnPhaBong);
            res.PhuongAnPhaBong = undefined;
            this.ghostItem = res;
            this.GetListTrienKhaiKeHoach();
            this.KiemTraButtonModal();
          })
        } else {
          this._toastr.error(res.message);
        }
      }
    });
  }
  checkBanBong(ban) {
    console.log(ban)
    console.log(this.itemCheckBan);
  }
  ChuyenDuyet() {
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
